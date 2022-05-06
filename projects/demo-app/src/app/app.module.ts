import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CytoscapejsModule } from 'ngx-cytoscapejs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CytoscapejsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
