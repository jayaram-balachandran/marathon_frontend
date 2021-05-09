import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  constructor(private _http: HttpClient) {}

  getMarathonData() {
    return this._http.get('http://127.0.0.1:3000/getmarathondata', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }

  getDisplayData() {
    return this._http.get('http://127.0.0.1:3000/getdisplaydata', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }

  saveEvent(body: any) {
    console.log('data in ser', body);
    return this._http.put('http://127.0.0.1:3000/saveEvent', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }
}
