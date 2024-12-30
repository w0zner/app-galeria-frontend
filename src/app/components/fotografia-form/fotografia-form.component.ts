import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-nueva-fotografia',
  templateUrl: './fotografia-form.component.html',
  styleUrls: ['./fotografia-form.component.css']
})
export class FotografiaFormComponent implements OnInit {

  fotografiaForm: FormGroup
  fileToInput: Array<File> = []

  modo: string | null = null
  id: string | null  = null
  archivo: any = null

  constructor(private fb: FormBuilder, private fotografiaService: FotografiasService, private uploadService: UploadService, private router:Router, private notificacionService: NotificacionService, private route: ActivatedRoute){
    this.fotografiaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: [null, [Validators.required]],
      numero: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      activo: [false],
      usuario_creacion: [''],
    })
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    if(this.id) {
      this.modo = 'edit'
      this.fotografiaService.obtenerPorId(this.id).subscribe({
        next: (data:any)=> {
          console.log(data.fotografia)
/*
          this.fotografiaService.obtenerFotografia(data.fotografia.imagen, false).subscribe({
            next: (response: any)=>{
              if (response instanceof File || response   instanceof Blob) {
                this.archivo=response
              }
            }
          }) */

          this.fotografiaForm.patchValue({
            nombre: data.fotografia.nombre,
            descripcion: data.fotografia.descripcion,
            numero: data.fotografia.numero,
            autor: data.fotografia.autor,
            activo: data.fotografia.activo,
            usuario_creacion: data.fotografia.usuario_creacion,
            imagen: data.fotografia.imagen
          })
        }
      })
    } else {
      this.modo = 'add'
    }
  }

  selectFile(file:any){
    if(file.target.files.length > 0){
      this.fileToInput = <Array<File>> file.target.files
      this.fotografiaForm.patchValue({
        imagen: file.target.files[0].name
      })
      //this.image_selected = file.target.files[0].name
    }
  }

  file(){

  }

  guardar() {
    if(this.modo=='add') {
      console.log(this.fotografiaForm);

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
    } else if(this.modo == 'edit') {
      this.fotografiaService.actualizar(this.fotografiaForm.value, this.id || '').subscribe({
        next: (response:any) => {
          console.log(response.foto._id);

          if(this.fileToInput.length > 0) {
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
          } else {
            this.router.navigateByUrl("/admin/list")
            this.notificacionService.notificacionDeExito("Registro modificado exitosamente!")
          }
        },
        error: (err) => {
          console.error(err)
          this.notificacionService.notificacionDeError(err)
        }
      })
    }
  }

}
