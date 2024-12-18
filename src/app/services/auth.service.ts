import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url + 'usuarios'
  }

  login(usuario: any, getToken?: any):Observable<any> {
    let head=new HttpHeaders({
      'Content-type':'Application/json'
    })
    return this.http.post<Observable<any>>(this.url + '/login', usuario, {headers: head}).pipe(
      tap((response:any) => {
        localStorage.setItem('user', JSON.stringify(response.usuario))
        localStorage.setItem('token', JSON.stringify(response.token))
      })
    )
  }

  refreshToken(usuario: any, token: any):Observable<any> {
    let head=new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-type':'Application/json'
    })
    return this.http.post<Observable<any>>(this.url + '/refresh-token', usuario, {headers: head}).pipe(
      tap((response:any) => {
        localStorage.setItem('user', JSON.stringify(response.usuario))
        localStorage.setItem('token', JSON.stringify(response.token))
      })
    )
  }

  reconfirmarAutenticacion(): Observable<any> {
    let jsonUser= localStorage.getItem('user') || ''
    let jsonToken= localStorage.getItem('token') || ''
    if(jsonUser !== '' && jsonToken !== '') {
      let user= JSON.parse(jsonUser)
      let token= JSON.parse(jsonToken)
      if(user && token) {
        return this.refreshToken(user, token).pipe(
          tap((response:any) => {
            localStorage.setItem('user', JSON.stringify(response.usuario))
            localStorage.setItem('token', JSON.stringify(response.token))
          }),
          map((response: any) => response),
          catchError((err) => {
            console.error(err);
            return of(null); // Retorna null en caso de error
          })
        )
      }
    }
    return of(null);
  }

  logout() {
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.clear()
    } catch (error) {
      console.error(error)
    }
  }
}
