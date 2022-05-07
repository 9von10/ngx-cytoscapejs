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
import cytoscape from 'cytoscape';
import { isEqual } from 'lodash';

@Component({
  selector: 'cytoscapejs',
  templateUrl: './cytoscapejs.component.html',
  styleUrls: ['./cytoscapejs.component.scss'],
})
export class CytoscapejsComponent implements AfterViewInit, OnChanges {
  @Input() cyOptions!: cytoscape.CytoscapeOptions;

  @Output() cyCoreChanged: EventEmitter<cytoscape.Core> = new EventEmitter<cytoscape.Core>();

  @ViewChild('cy') cyElementRef!: ElementRef;

  private isVisible = false;

  private cyCore!: cytoscape.Core;

  ngAfterViewInit(): void {
    this.isVisible = true;
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { cyOptions } = changes;

    if (cyOptions && !isEqual(cyOptions.previousValue, cyOptions.currentValue)) {
      this.render();
    }
  }

  getCyCore(): cytoscape.Core {
    return this.cyCore;
  }

  private render(): void {
    if (this.isVisible && this.cyOptions) {
      this.cyCore = cytoscape({ ...this.cyOptions, container: this.cyElementRef.nativeElement });
      this.cyCoreChanged.emit(this.cyCore);
    }
  }
}
