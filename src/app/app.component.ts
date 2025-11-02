import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';

  @Component({
    selector: 'app-root',
    template: '<ion-app><router-outlet></router-outlet></ion-app>',
    standalone: true,
    imports: [IonApp, RouterOutlet, IonRouterOutlet]
  })
  
  export class AppComponent {
    constructor() {}
  }