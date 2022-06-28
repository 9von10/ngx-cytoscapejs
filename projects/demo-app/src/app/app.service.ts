import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getCyData(): Observable<any> {
    return this.http.get<any>('assets/cy-data.json');
  }

  getCx1BackgroundData(): Observable<any> {
    return this.http.get<any>('assets/cx1-background-data.json');
  }

  getCx1Data(): Observable<any> {
    return this.http.get<any>('assets/cx1-data.json');
  }

  getCx2Data(): Observable<any> {
    return this.http.get<any>('assets/cx2-data.json');
  }
}
