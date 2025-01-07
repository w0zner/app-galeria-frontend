import {trigger, state, animate, transition, style, query, keyframes, stagger, group } from '@angular/animations'

export const Animations = [
  trigger('slideAnimation', [
    transition('void => left', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      query('.btn-leer-mas', style({transform: 'scale(0.2)', opacity: 0, background: '#fff'}), { optional: true }),
      query('.txt-leer-mas', style({opacity: 0}), { optional: true }),
      query('.linea-inferior', style({right: '100%'}), { optional: true }),
      query('.data-fotografia', style({opacity: 0, transform: 'translateX(-20%)'}), { optional: true }),
      group([
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
        query('.btn-leer-mas', animate('300ms 700ms', keyframes([
          style({transform: 'scale(1)', opacity: 1, offset: 0.8}),
          style({background: 'transparent', offset: 1})
        ])), { optional: true }),
        query('.txt-leer-mas', animate('300ms 700ms', style('*')), { optional: true }),
        query('.linea-inferior', animate('300ms 700ms', style('*')), { optional: true }),
        query('.data-fotografia', animate('200ms 600ms', style('*')), { optional: true })
      ])
    ]),
    transition('void => right', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      query('.btn-leer-mas', style({transform: 'scale(0.2)', opacity: 0, background: '#fff'}), { optional: true }),
      query('.txt-leer-mas', style({opacity: 0}), { optional: true }),
      query('.linea-inferior', style({left: '100%'}), { optional: true }),
      query('.data-fotografia', style({opacity: 0, transform: 'translateX(20%)'}), { optional: true }),
      group([
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
        query('.btn-leer-mas', animate('300ms 700ms', keyframes([
          style({transform: 'scale(1)', opacity: 1, offset: 0.8}),
          style({background: 'transparent', offset: 1})
        ])), { optional: true }),
        query('.txt-leer-mas', animate('300ms 700ms', style('*')), { optional: true }),
        query('.linea-inferior', animate('300ms 700ms', style('*')), { optional: true }),
        query('.data-fotografia', animate('200ms 600ms', style('*')), { optional: true })
      ])

    ]),
    transition('* => void', [
      animate('800ms ease-in', style({ transform: 'translateX(0)', opacity: 0 }))
    ])
  ]),
  trigger('verMasAnimation', [
    transition('void => *', [
      style({opacity: 0}),
      query('.detalle', style({opacity: 0, transform: 'translateY(180px)'})),
      query('.instagram, .facebook', style({transform: 'scale(0)'})),
      group([
        animate('300ms ease-in', style({opacity:1})),
        query('.detalle', stagger(80, [
          animate('600ms ease-in', style('*'))
        ]))
      ]),
      query('.instagram', animate('200ms', style('*'))),
      query('.facebook', animate('200ms', style('*'))),
    ]),
    transition('* => void', [
      style({opacity: 1}),
      query('.detalle', style({opacity: 1, transform: 'scale(0)'})),
      query('.instagram, .facebook', style('*')),
        animate('300ms ease-out', style({opacity:0})),
        query('.detalle', stagger(50, [
          animate('600ms ease-out', style('*'))
        ])),
    ]),
  ])
]

