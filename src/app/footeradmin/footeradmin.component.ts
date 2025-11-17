import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonIcon,
  IonToolbar,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cubeOutline, readerOutline, alertCircleOutline, statsChartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-footeradmin',
  standalone: true,
  templateUrl: './footeradmin.component.html',
  styleUrls: ['./footeradmin.component.scss'],
  imports: [
    RouterLink,
    IonButton,
    IonIcon,
    IonToolbar,
    IonFooter,
    IonIcon,
    RouterLink
  ]
})
export class FooteradminComponent { 
  constructor() {
    addIcons({homeOutline,cubeOutline,readerOutline,alertCircleOutline,statsChartOutline});
  } 
}