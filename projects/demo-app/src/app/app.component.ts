import { Component } from '@angular/core';
import { CytoscapeOptions } from 'cytoscape';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cytoscapeOptions!: CytoscapeOptions;

  constructor(private appService: AppService) {}

  renderCytoscapeGraph(): void {
    this.appService.getCyData().subscribe((data) => {
      this.cytoscapeOptions = data;
    });
  }
}
