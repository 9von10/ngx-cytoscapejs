import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CytoscapejsModule } from 'ngx-cytoscapejs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, CytoscapejsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
