import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuarioForm: FormGroup
  modo: string | null = null
  id: string | null  = null

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router:Router, private notificacionService: NotificacionService, private route: ActivatedRoute){
    this.usuarioForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    if(this.id) {
      this.modo = 'edit'
      this.usuarioService.obtenerPorId(this.id).subscribe({
        next: (data:any)=> {
          console.log(data.usuario)

          this.usuarioForm.patchValue({
            usuario: data.usuario.usuario,
            password: data.usuario.password,
            rol: data.usuario.rol
          })
        }
      })
    } else {
      this.modo = 'add'
    }
  }

  guardar() {
    if(this.modo=='add') {
    console.log(this.usuarioForm);

    this.usuarioService.guardar(this.usuarioForm.value).subscribe({
      next: (response:any) => {
        this.router.navigateByUrl("/admin/list")
        this.notificacionService.notificacionDeExito("Usuario registrado exitosamente!")
      },
      error: (err) => {
        console.error(err)
        this.notificacionService.notificacionDeError(err)
      }
    })
  } else if(this.modo == 'edit') {
    this.usuarioService.actualizar(this.usuarioForm.value, this.id || '').subscribe({
      next: (response:any) => {
        this.router.navigateByUrl("/admin/list")
        this.notificacionService.notificacionDeExito("Usuario actualizado exitosamente!")
      },
      error: (err) => {
        console.error(err)
        this.notificacionService.notificacionDeError(err)
      }
    })
  }
  }

}
