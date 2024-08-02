import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);

  getCyData(): Observable<any> {
    return this.http.get<any>('cy-data.json');
  }

  getCx1BackgroundData(): Observable<any> {
    return this.http.get<any>('cx1-background-data.json');
  }

  getCx1Data(): Observable<any> {
    return this.http.get<any>('cx1-data.json');
  }

  getCx2Data(): Observable<any> {
    return this.http.get<any>('cx2-data.json');
  }
}
