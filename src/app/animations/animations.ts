import {trigger, state, animate, transition, style, query, keyframes, stagger, group } from '@angular/animations'

export const Animations = [
  trigger('mover-fotografia', [
    transition('* => right', [
      style({transform: 'translateX(100%)', opacity:0}),
      animate('1000ms 500ms cubic-bezier(0.22, 1, 0.36, 1)', style('*'))
    ]),
    transition('* => left', [
      style({transform: 'translateX(-100%)', opacity:0}),
      animate('1000ms 500ms cubic-bezier(0.22, 1, 0.36, 1)', style('*'))
    ]),
    transition('* => void',[
      style({'z-index':0, transform: 'translateX(0%)', opacity: 1}),
      animate('100ms',keyframes([
          style({opacity:0.7, offset:0.3}),
          style({opacity:0, offset:1})
      ]))
  ])
  ])
]
