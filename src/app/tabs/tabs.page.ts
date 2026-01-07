import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// GANTI IMPORT DARI @ionic/angular BIASA KE STANDALONE
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
} from '@ionic/angular/standalone'; 

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
  // --- PERHATIKAN PERUBAHAN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule, 
    // HAPUS IonicModule, GANTI DENGAN INI:
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonLabel
  ]
})
export class TabsPage implements OnInit {

  constructor() { 
    addIcons({ newspaperOutline, gridOutline, searchOutline, heartOutline, personCircleOutline });
  }

  ngOnInit() {
  }

}