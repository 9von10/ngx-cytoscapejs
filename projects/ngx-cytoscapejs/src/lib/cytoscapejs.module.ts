import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CytoscapejsComponent } from './component/cytoscapejs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CytoscapejsComponent],
  exports: [CytoscapejsComponent],
})
export class CytoscapejsModule {}
