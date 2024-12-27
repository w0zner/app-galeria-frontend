import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
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

  constructor(private fb: FormBuilder, private fotografiaService: FotografiasService, private uploadService: UploadService, private router:Router, private notificacionService: NotificacionService){
    this.fotografiaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      activo: [false],
      usuario_creacion: [''],
    })
  }

  selectFile(file:any){
    if(file.target.files.length > 0){
      this.fileToInput = <Array<File>> file.target.files
      this.image_selected = file.target.files[0].name
    }
  }

  file(){

  }

  guardar() {
    this.fotografiaService.guardar(this.fotografiaForm.value).subscribe({
      next: (response:any) => {
        console.log(this.fileToInput)
        console.log(response.foto._id);

        this.uploadService.subirArchivo(this.fileToInput, response.foto._id).subscribe({
          next: (response) => {
            console.log(response);

            this.router.navigateByUrl("/admin/list")
            this.notificacionService.notificacionDeExito("Foto guardada exitosamente!")
          },
          error: (err) => {
            console.error(err)
            this.router.navigateByUrl("/admin/list")
            this.notificacionService.notificacionDeError(err)
          }
        })
      },
      error: (err) => {
        console.error(err)
        this.notificacionService.notificacionDeError(err)
      }
    })
  }

}
