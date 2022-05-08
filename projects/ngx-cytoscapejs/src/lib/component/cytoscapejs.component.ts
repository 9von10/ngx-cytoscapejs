import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape';
import { isEqual } from 'lodash';
import { debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { CxConverter } from '../enum/cx-converter.enum';
import { CxService } from '../service/cx.service';

@Component({
  selector: 'cytoscapejs',
  templateUrl: './cytoscapejs.component.html',
  styleUrls: ['./cytoscapejs.component.scss'],
})
export class CytoscapejsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() cytoscapeOptions!: CytoscapeOptions;

  @Input() autoFit: boolean = true;

  @Input() cxData!: any;

  @Input() cxConverters: CxConverter[] = [CxConverter.cx2js, CxConverter.cxVizConverter];

  @Output() coreChanged: EventEmitter<Core> = new EventEmitter<Core>();

  @ViewChild('cy') cyElementRef!: ElementRef;

  private isViewInitialized: boolean = false;

  private core!: Core;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cxService: CxService) {}

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => this.fit());

    this.isViewInitialized = true;
    this.preRender();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { cytoscapeOptions, cxData } = changes;

    if (
      (cytoscapeOptions &&
        !isEqual(cytoscapeOptions.previousValue, cytoscapeOptions.currentValue)) ||
      (cxData && !isEqual(cxData.previousValue, cxData.currentValue))
    ) {
      this.preRender();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private preRender(): void {
    if (!this.isViewInitialized || (!this.cytoscapeOptions && !this.cxData)) {
      return;
    }

    let options: CytoscapeOptions | null = null;

    if (this.cytoscapeOptions) {
      options = this.cytoscapeOptions;
    } else if (this.cxData) {
      options = this.cxService.convert(this.cxData, this.cxConverters);
    }

    if (options) {
      this.render(options);
    }
  }

  private render(options: CytoscapeOptions): void {
    if (options) {
      this.core = cytoscape({ ...options, container: this.cyElementRef.nativeElement });
      this.core.fit();
      this.coreChanged.emit(this.core);
    }
  }

  private fit(): void {
    if (this.autoFit && this.core) {
      this.core.fit();
    }
  }
}
