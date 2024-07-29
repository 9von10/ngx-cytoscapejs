import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CytoscapejsModule } from 'ngx-cytoscapejs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, CytoscapejsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
