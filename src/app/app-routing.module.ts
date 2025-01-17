import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { authGuard } from './guards/auth.guard';
import { FotografiaFormComponent } from './components/fotografia-form/fotografia-form.component';
import { PhotoSliderComponent } from './components/photo-slider/photo-slider.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

const routes: Routes = [
  {path: 'home/:num', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard],
    children: [
      {path: 'slider', component: PhotoSliderComponent},
      {path: 'list', component: ListComponent},
      {path: 'new', component: FotografiaFormComponent},
      {path: 'edit/:id', component: FotografiaFormComponent},
      {path: 'usuario/new', component: UsuarioFormComponent},
      {path: 'usuario/edit/:id', component: UsuarioFormComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo:'home/1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
