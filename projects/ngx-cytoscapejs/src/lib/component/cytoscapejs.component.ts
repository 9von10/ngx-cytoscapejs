import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { CxAttributeNameMap } from '../interface/cx-attribute-name-map.interface';
import { CxConverter } from '../enum/cx-converter.enum';
import { CxService } from '../service/cx.service';

/**
 * This component handles rendering the Cytoscape.js graph.
 */
@Component({
  selector: 'cytoscapejs',
  standalone: true,
  templateUrl: './cytoscapejs.component.html',
  styleUrl: './cytoscapejs.component.scss',
})
export class CytoscapejsComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  /**
   * Object containing information about a graph. Must conform to [CytoscapeOptions]{@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cytoscape/index.d.ts}. A specified container is ignored.
   * Should not be defined, if you are using {@link cxData} to build a graph.
   */
  @Input() cytoscapeOptions!: CytoscapeOptions;

  /**
   * Responsible for automatically resizing the graph when the browser window changes its size.
   * If true, resizing the graph is triggered.
   * If false, changes in window size are ignored.
   */
  @Input() autoFit: boolean = true;

  /**
   * Responsible for applying the background color specified in the CX file to the canvas.
   * If true, the network's background color will be set to the color specified in the CX.
   * If false, the network's background color will be white.
   */
  @Input() applyCxBackgroundColor: boolean = false;

  /**
   * Object containing information about a graph. Must conform to [CX data model]{@link https://home.ndexbio.org/data-model/}.
   * Should not be defined, if you are using {@link cytoscapeOptions} to build a graph.
   */
  @Input() cxData!: any;

  /**
   * List of {@link CxConverter}s you wish to use for conversion of your {@link cxData}.
   * Arrange the converters in the order, in which they are to be executed, e.g. the first converter you specify will be tried first.
   * The first successful conversion result will be rendered.
   */
  @Input() cxConverters: CxConverter[] = [
    CxConverter.cx2js,
    CxConverter.cxVizConverter,
  ];

  /**
   * Each time a new [Cytoscape.js core]{@link https://js.cytoscape.org/#core} is built, this output is firing an event containing the recent core.
   */
  @Output() coreChanged: EventEmitter<Core> = new EventEmitter<Core>();

  /**
   * Each time a new [Cytoscape.js core]{@link https://js.cytoscape.org/#core} is built using [cx2js]{@link https://github.com/cytoscape/cx2js} the
   * resulting attributeNameMap object is emitted as well.
   */
  @Output() cxAttributeNameMapChanged: EventEmitter<CxAttributeNameMap> =
    new EventEmitter<CxAttributeNameMap>();

  /**
   * Reference to the HTMLElement that is used as a [container]{@link https://js.cytoscape.org/#core/initialisation} for the graph.
   *
   * @internal
   */
  @ViewChild('cy') cyElementRef!: ElementRef;

  /**
   * Represents a state in the [Angular lifecycle]{@link https://angular.io/guide/lifecycle-hooks} indicating, that the view has been initialized.
   *
   * @internal
   */
  private isViewInitialized: boolean = false;

  /**
   * [Cytoscape.js core]{@link https://js.cytoscape.org/#core} that is rendered.
   *
   * @internal
   */
  private core!: Core;

  /**
   * Serves as an indicator, when the component has been destroyed.
   *
   * @internal
   */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Service responsible for conversion
   *
   * @internal
   */
  private cxService = inject(CxService);

  /**
   * [Angular lifecycle]{@link https://angular.io/guide/lifecycle-hooks} which is called as soon as the view has been initialized.
   * Used to subscribe to any window resize event. Triggers initial rendering.
   */
  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => this.fit());

    this.isViewInitialized = true;
    this.preRender();
  }

  /**
   * [Angular lifecycle]{@link https://angular.io/guide/lifecycle-hooks} which is called every time, an input property changes its value.
   * Used to update the graph's visualization.
   *
   * @param {SimpleChanges} changes Object containing all changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { cytoscapeOptions, cxData, autoFit } = changes;

    if (cytoscapeOptions || cxData) {
      this.preRender();
    }

    if (autoFit) {
      this.fit();
    }
  }

  /**
   * [Angular lifecycle]{@link https://angular.io/guide/lifecycle-hooks} which is called as soon as the component is destroyed.
   * Used to unsubscribe from window resize events.
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Based on the user's input, this method decides, if rendering can happen and which input is to be used.
   */
  private preRender(): void {
    if (!this.isViewInitialized || (!this.cytoscapeOptions && !this.cxData)) {
      return;
    }

    if (this.cytoscapeOptions) {
      this.render(this.cytoscapeOptions);
    } else if (this.cxData) {
      const conversion = this.cxService.convert(this.cxData, this.cxConverters);

      if (conversion) {
        const { options, attributeNameMap, backgroundColor } = conversion;

        if (this.cyElementRef && this.cyElementRef.nativeElement) {
          const htmlElement: HTMLElement = this.cyElementRef.nativeElement;

          if (this.applyCxBackgroundColor && backgroundColor) {
            htmlElement.style.backgroundColor = backgroundColor;
          } else {
            htmlElement.style.backgroundColor = '';
          }
        }

        this.cxAttributeNameMapChanged.emit(attributeNameMap);

        if (options) {
          this.render(options);
        }
      }
    }
  }

  /**
   * Renders the graph using [CytoscapeOptions]{@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cytoscape/index.d.ts}.
   *
   * @param {CytoscapeOptions} options Object containing graph information
   */
  private render(options: CytoscapeOptions): void {
    if (options) {
      this.core = cytoscape({
        ...options,
        container: this.cyElementRef.nativeElement,
      });
      this.core.fit();
      this.coreChanged.emit(this.core);
    }
  }

  /**
   * Resizes and repositions the graph to fit the current window size.
   */
  private fit(): void {
    if (this.autoFit && this.core) {
      this.core.fit();
    }
  }
}
