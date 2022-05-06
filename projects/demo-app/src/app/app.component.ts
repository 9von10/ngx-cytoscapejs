import { Component } from '@angular/core';
import cytoscape from 'cytoscape';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cyOptions!: cytoscape.CytoscapeOptions;

  constructor(private appService: AppService) {}

  renderCytoscapeGraph(): void {
    this.appService.getCyData().subscribe((data) => {
      this.cyOptions = data;
    });
  }
}
