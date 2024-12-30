import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fotografias: any[] = []
  url: string=''

  constructor(private fotografiasService: FotografiasService) {
    this.url = GLOBAL.url + 'fotografias' + '/get-foto/'
  }

  ngOnInit(): void {
    this.getFotografias()

  }

  getFotografias() {
    this.fotografiasService.getAll().subscribe({
      next: (data: any) => {
        this.fotografias = data.fotografias
        console.log(this.fotografias)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

}
