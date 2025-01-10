import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url + 'usuarios'
  }

  obtenerPorId(id:string){
    let headers=new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
      'Content-type':'Application/json'
    })
    return this.http.get(this.url + '/' + id, {headers: headers})
  }

  guardar(fotografia: any) {
    let headers=new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
      'Content-type':'Application/json'
    })
    return this.http.post(this.url + '/crear', fotografia, {headers: headers})
  }

  actualizar(fotografia: any, id:string) {
    let headers=new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
      'Content-type':'Application/json'
    })
    return this.http.post(this.url + '/actualizar/' + id, fotografia, {headers: headers})
  }
}