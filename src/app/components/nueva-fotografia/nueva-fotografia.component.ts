import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-nueva-fotografia',
  templateUrl: './nueva-fotografia.component.html',
  styleUrls: ['./nueva-fotografia.component.css']
})
export class NuevaFotografiaComponent {

  fotografiaForm: FormGroup
  fileToInput: Array<File> = []
  image_selected: any

  constructor(private fb: FormBuilder, private fotografiaService: FotografiasService, private uploadService: UploadService, private router:Router){
    this.fotografiaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: [''],
      imagen: [''],
      numero: [''],
      autor: ['', [Validators.required]],
      activo: [],
      usuario_creacion: ['', [Validators.required]],
    })
  }

  selectFile(file:any){
    if(file.target.files.length > 0){
      this.fileToInput = <Array<File>> file
      this.image_selected = file.target.files[0].name
    }
  }

  file(){

  }

  guardar() {
    this.fotografiaService.guardar(this.fotografiaForm.value).subscribe({
      next: (response:any) => {
        this.uploadService.subirArchivo(this.fileToInput, response.fotografia.id).subscribe({
          next: (response) => {
            this.router.navigateByUrl("/admin/list")
          },
          error: (err) => {
            console.error(err)
            this.router.navigateByUrl("/admin/list")
          }
        })
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
