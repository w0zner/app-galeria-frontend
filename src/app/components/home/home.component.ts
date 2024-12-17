import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fotografias: any[] = []

  constructor(private fotografiasService: FotografiasService) {}

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
