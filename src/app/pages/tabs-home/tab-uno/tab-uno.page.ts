import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar,IonButton, IonBackButton, IonButtons,IonMenu,IonMenuButton,IonLabel,IonIcon,IonSplitPane } from '@ionic/angular/standalone';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab-uno',
  templateUrl: './tab-uno.page.html',
  styleUrls: ['./tab-uno.page.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonApp,IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,IonMenu,IonMenuButton,IonButtons,IonLabel,IonIcon,IonSplitPane]
})
export class TabUnoPage implements OnInit {

  constructor() { }

  ngOnInit() {

}
}
