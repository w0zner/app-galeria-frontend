import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard],
    children: [{path: 'list', component: ListComponent}]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
