import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animations } from 'src/app/animations/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: Animations
})
export class AdminComponent implements OnInit {
  user: any = null;

  @HostBinding('@adminComponentAnimations') adminAnimation: any;

  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.user = this.authService.getUserLogged()

    if(this.user) {
      console.log(this.user.usuario)
    }
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/')
  }

}
