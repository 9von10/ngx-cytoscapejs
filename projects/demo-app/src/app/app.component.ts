import { Component } from '@angular/core';
import { Core, CytoscapeOptions } from 'cytoscape';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cytoscapeOptions!: CytoscapeOptions;

  core!: Core;

  autoFit: boolean = true;

  constructor(private appService: AppService) {}

  coreChanged(core: Core): void {
    this.core = core;
  }

  renderCytoscapeGraph(): void {
    this.appService.getCyData().subscribe((data) => {
      this.cytoscapeOptions = data;
    });
  }

  fitGraph(): void {
    if (this.core) {
      this.core.fit();
    }
  }
}
