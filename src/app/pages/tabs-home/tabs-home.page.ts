import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonTabs, IonTabBar, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs-home',
  templateUrl: './tabs-home.page.html',
  styleUrls: ['./tabs-home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonTabBar, IonTabs, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TabsHomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  

}
