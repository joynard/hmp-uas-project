import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './services/auth';
import { addIcons } from 'ionicons'; 
import { 
  homeOutline, 
  gridOutline, 
  searchOutline, 
  heartOutline, 
  personCircleOutline,
  addCircleOutline,
  duplicateOutline, 
  logOutOutline,
  newspaperOutline,
} from 'ionicons/icons';

// --- IMPORT KOMPONEN IONIC SECARA SPESIFIK (STANDALONE) ---
import { 
  IonApp, 
  IonRouterOutlet, 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonMenuToggle, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonFooter 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  // --- GANTI IonicModule DENGAN DAFTAR KOMPONEN INI ---
  imports: [
    CommonModule, 
    RouterLink,
    IonApp, 
    IonRouterOutlet, 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonFooter
  ],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.loadTheme();

    const isDark = this.authService.isDarkMode();
    document.body.classList.toggle('dark', isDark);

    addIcons({ 
      homeOutline, 
      gridOutline, 
      searchOutline, 
      heartOutline, 
      personCircleOutline,
      addCircleOutline,
      duplicateOutline,
      logOutOutline,
      newspaperOutline
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}