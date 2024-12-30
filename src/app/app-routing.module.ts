import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { authGuard } from './guards/auth.guard';
import { FotografiaFormComponent } from './components/fotografia-form/fotografia-form.component';

const routes: Routes = [
  {path: 'home/:num', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard],
    children: [
      {path: 'list', component: ListComponent},
      {path: 'new', component: FotografiaFormComponent},
      {path: 'edit/:id', component: FotografiaFormComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
