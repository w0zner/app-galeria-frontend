import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private notificacionService: NotificacionService) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response:any) => {
        this.router.navigateByUrl('/admin/list')
      },
      error: (err) => {
        this.notificacionService.notificacionDeError(err)
      }
    })
  }

}
