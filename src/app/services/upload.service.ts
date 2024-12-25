import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url + 'fotografias/subir-foto/'
  }

  subirArchivo(files: Array<File>, id: string) {
    let formData = new  FormData()
    formData.append('foto', files[0], files[0].name)
    return this.http.post(this.url + id, formData)
  }
}
