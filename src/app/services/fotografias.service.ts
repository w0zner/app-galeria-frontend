import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class FotografiasService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url + 'fotografias'
  }

  getAll() {
    return this.http.get(this.url + '/')
  }

  getAllAdmin() {
    let headers=new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
      'Content-type':'Application/json'
    })
    return this.http.get(this.url + '/admin', {headers: headers})
  }
}
