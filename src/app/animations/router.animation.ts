import {
    query,
    style,
    animate,
    group,
    animation
  } from '@angular/animations';

  export const routerAnimation = animation([
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX({{offsetEnter}}%)', opacity: 0 }),
        animate('0.4s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0.4s ease-in-out', style({ transform: 'translateX({{offsetLeave}}%)', opacity: 0}))
      ], { optional: true }),
    ])
  ]);

  export const verticalAnimation = animation([
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateY({{offsetEnter}}%)', opacity: 0 }),
        animate('0.4s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate('0.4s ease-in-out', style({ transform: 'translateY({{offsetLeave}}%)', opacity: 0}))
      ], { optional: true }),
    ])
  ]);
