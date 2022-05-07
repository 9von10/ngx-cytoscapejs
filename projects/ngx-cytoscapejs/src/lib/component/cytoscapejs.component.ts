import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape';
import { isEqual } from 'lodash';

@Component({
  selector: 'cytoscapejs',
  templateUrl: './cytoscapejs.component.html',
  styleUrls: ['./cytoscapejs.component.scss'],
})
export class CytoscapejsComponent implements AfterViewInit, OnChanges {
  @Input() cytoscapeOptions!: CytoscapeOptions;

  @Output() coreChanged: EventEmitter<Core> = new EventEmitter<Core>();

  @ViewChild('cy') cyElementRef!: ElementRef;

  private isVisible = false;

  private core!: Core;

  ngAfterViewInit(): void {
    this.isVisible = true;
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

  getCyCore(): Core {
    return this.core;
  }

  private render(): void {
    if (this.isVisible && this.cytoscapeOptions) {
      this.core = cytoscape({
        ...this.cytoscapeOptions,
        container: this.cyElementRef.nativeElement,
      });
      this.coreChanged.emit(this.core);
    }
  }
}
