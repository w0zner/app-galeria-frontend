import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animations } from 'src/app/animations/animations';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [Animations]
})
export class HomeComponent implements OnInit {
  fotografias: any[] = []
  url: string=''
  fotoSeleccionada: any = {}
  num: any = null
  verMas: boolean= false;
  fotoActual:number=0
  direccion: any | null
  currentPhotoIndex = 0;
  lastDirection: 'left' | 'right' | 'void' = 'void';

  constructor(private fotografiasService: FotografiasService, private route: ActivatedRoute) {
    this.url = GLOBAL.url + 'fotografias' + '/get-foto/'
  }

  ngOnInit(): void {
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
    if(fotografia.numero > this.fotoActual){
      this.direccion="right"
    } else if(fotografia.numero < this.fotoActual){
      this.direccion="left"
    }

    this.fotoActual=fotografia.numero
  }

  getState(index: number): string {
    if (index === this.currentPhotoIndex) return this.lastDirection;
    return 'void';
  }

  next() {
    this.lastDirection = 'right';
    this.currentPhotoIndex = this.fotoSeleccionada.siguiente
  }

  prev() {
    this.lastDirection = 'left';
    this.currentPhotoIndex = this.fotoSeleccionada.anterior
  }

}
