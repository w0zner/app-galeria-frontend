import { Component, OnInit } from '@angular/core';
import { Animations } from 'src/app/animations/animations';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [Animations]
})
export class ListComponent implements OnInit {

  fotografias: any[]= []
  url: string=''

  constructor(private fotografiaService: FotografiasService){
    this.url = GLOBAL.url + 'fotografias' + '/get-foto/'
  }
  ngOnInit(): void {
    this.getFotosAdmin()
  }

  getFotosAdmin() {
    this.fotografiaService.getAllAdmin().subscribe({
      next: (data:any)=> {
        this.fotografias = data.fotografias
        console.log(this.fotografias);
      }
    })
  }

}



/*
Ejemplo uso de toast

Toastify({
  text: "This is a toast",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
*/
