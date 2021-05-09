import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participant } from './participant';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private _http: HttpClient) {}

  registerParticipant(body: any) {
    console.log('data in ser', body);
    return this._http.post('http://127.0.0.1:3000/registerparticipant', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }

  getParData() {
    return this._http.get('http://127.0.0.1:3000/getpardata', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }
}
