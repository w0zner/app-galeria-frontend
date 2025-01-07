import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('void => left', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('void => right', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('* => void', [
        animate('500ms ease-in', style({ transform: 'translateX(0)', opacity: 0 }))
      ])
    ])
  ]
})
export class PhotoSliderComponent {
  photos = ['http://localhost:8010/galery/api/fotografias/get-foto/d_n5j_XnDp3WYEkLrVGZ-HPA.jpg/true', 'http://localhost:8010/galery/api/fotografias/get-foto/j_Ww-aSixh7k4p8syLAFivFb.jpeg/true', 'http://localhost:8010/galery/api/fotografias/get-foto/AngA3RvZUskAcp2zS-YVIK9-.jpg/true'];
  currentIndex = 0;
  animationDirection: 'left' | 'right' = 'left';

  previous() {
    this.animationDirection = 'right';
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
  }

  next() {
    this.animationDirection = 'left';
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }
}
