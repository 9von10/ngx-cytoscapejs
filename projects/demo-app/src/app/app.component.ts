import { Component } from '@angular/core';
import { Core, CytoscapeOptions } from 'cytoscape';
import { CxConverter } from 'ngx-cytoscapejs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cytoscapeOptions!: CytoscapeOptions | null;

  core!: Core;

  autoFit: boolean = true;

  cxData!: any;

  cxConverters!: CxConverter[];

  renderCount = 0;

  useMutableInputAssignment = true;

  private cytoscapeJsonData!: CytoscapeOptions;

  constructor(private appService: AppService) {}

  coreChanged(core: Core): void {
    this.core = core;
    this.renderCount += 1;
  }

  renderCytoscapeGraph(): void {
    if (!this.cytoscapeJsonData) {
      this.appService.getCyData().subscribe((data) => {
        this.cxData = null;
        this.cytoscapeJsonData = data;
        this.cytoscapeOptions = this.cytoscapeJsonData;
      });
    } else if (this.useMutableInputAssignment) {
      this.cytoscapeOptions = this.cytoscapeJsonData;
    } else {
      this.cytoscapeJsonData = { ...this.cytoscapeJsonData };
      this.cytoscapeOptions = this.cytoscapeJsonData;
    }
  }

  renderCx1Graph(): void {
    this.appService.getCx1Data().subscribe((data) => {
      this.cytoscapeOptions = null;
      this.cxConverters = [CxConverter.cx2js];
      this.cxData = data;
    });
  }

  renderCx2Graph(): void {
    this.appService.getCx2Data().subscribe((data) => {
      this.cytoscapeOptions = null;
      this.cxConverters = [CxConverter.cxVizConverter];
      this.cxData = data;
    });
  }

  fitGraph(): void {
    if (this.core) {
      this.core.fit();
    }
  }
}
