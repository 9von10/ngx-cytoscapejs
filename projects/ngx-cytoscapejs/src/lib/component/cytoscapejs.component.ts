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

@Component({
  selector: 'cytoscapejs',
  templateUrl: './cytoscapejs.component.html',
  styleUrls: ['./cytoscapejs.component.scss'],
})
export class CytoscapejsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() cytoscapeOptions!: CytoscapeOptions;

  @Input() autoFit: boolean = true;

  @Output() coreChanged: EventEmitter<Core> = new EventEmitter<Core>();

  @ViewChild('cy') cyElementRef!: ElementRef;

  private isViewInitialized: boolean = false;

  private core!: Core;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => this.fit());

    this.isViewInitialized = true;
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { cytoscapeOptions } = changes;

    if (
      cytoscapeOptions &&
      !isEqual(cytoscapeOptions.previousValue, cytoscapeOptions.currentValue)
    ) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private render(): void {
    if (this.isViewInitialized && this.cytoscapeOptions) {
      this.core = cytoscape({
        ...this.cytoscapeOptions,
        container: this.cyElementRef.nativeElement,
      });
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
