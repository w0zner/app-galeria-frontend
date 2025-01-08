import { Component, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-thumb',
  templateUrl: './thumb.component.html',
  styleUrls: ['./thumb.component.css']
})
export class ThumbComponent {

  @Input() foto: any
  @Input() fotoSeleccionada: any
  url: string=''

  constructor(){
    this.url = GLOBAL.url + 'fotografias' + '/get-foto/'
  }

}
