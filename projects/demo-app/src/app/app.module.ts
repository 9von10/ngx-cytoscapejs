import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CytoscapejsModule } from 'ngx-cytoscapejs';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CytoscapejsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
