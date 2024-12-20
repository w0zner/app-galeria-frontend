import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
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
