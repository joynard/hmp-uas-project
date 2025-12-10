import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonicModule, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
} from '@ionic/angular'; 

import { addIcons } from 'ionicons'; 
import { 
  newspaperOutline, 
  gridOutline, 
  searchOutline, 
  heartOutline, 
  personCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,

  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule 
  ]
})
export class TabsPage implements OnInit {

  constructor() { 
    addIcons({ newspaperOutline, gridOutline, searchOutline, heartOutline, personCircleOutline });
  }

  ngOnInit() {
  }

}