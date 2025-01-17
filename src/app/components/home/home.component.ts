import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/animations/animations';
import { AuthService } from 'src/app/services/auth.service';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [Animations]
})
export class HomeComponent implements OnInit {
  user: any = null;
  fotografias: any[] = []
  url: string=''
  fotoSeleccionada: any = {}
  num: any = null
  verMas: boolean= false;
  fotoActual:number=0
  direccion: any | null
  currentIndex = 0;
  animationDirection: 'left' | 'right' = 'left';
  show_thumbs: boolean = false

  constructor(private fotografiasService: FotografiasService, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.url = GLOBAL.url + 'fotografias' + '/get-foto/'
  }

  ngOnInit(): void {
    this.user = this.authService.getUserLogged()

    if(this.user) {
      console.log(this.user.usuario)
    }

    this.route.params.subscribe(params => {
      this.num = params['num']
      console.log(this.num)

      this.getFotografias()
    })
    //let num = this.route.snapshot.paramMap.get('num')


  }

  getFotografias() {
    this.fotografiasService.getAll().subscribe({
      next: (data: any) => {
        console.log(100)
        this.fotografias = data.fotografias
        //let num = this.route.snapshot.paramMap.get('num')
        this.fotoSeleccionada.fotografia=this.fotografias.find(result => { return result.numero == this.num})

        if(!this.fotoSeleccionada.fotografia) {
          this.fotoSeleccionada.fotografia=this.fotografias[0]
        }
        let next= this.fotografias.indexOf(this.fotoSeleccionada.fotografia) + 1;
        let prev= this.fotografias.indexOf(this.fotoSeleccionada.fotografia) - 1;
        console.log(next);
        console.log(prev);

        this.fotoSeleccionada.siguiente = next < this.fotografias.length ? this.fotografias[next].numero:null;
        this.fotoSeleccionada.anterior = prev >= 0 ? this.fotografias[prev].numero:null;

        console.log(this.fotoSeleccionada.siguiente);
        console.log(this.fotoSeleccionada.anterior);

        this.moverFotografia(this.fotoSeleccionada.fotografia)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  moverFotografia(fotografia: any) {
    this.show_thumbs = false
    if(fotografia.numero > this.fotoActual){
      this.direccion="right"
    } else if(fotografia.numero < this.fotoActual){
      this.direccion="left"
    } else {
      console.log('void')
      this.direccion='void'
    }

    this.fotoActual=fotografia.numero
    this.router.navigate(['/home/', this.fotoActual])
  }

}
