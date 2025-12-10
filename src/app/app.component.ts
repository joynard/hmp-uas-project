import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
  logOutOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Registrasi semua icon yang dipakai di menu
    addIcons({ 
      homeOutline, 
      gridOutline, 
      searchOutline, 
      heartOutline, 
      personCircleOutline,
      addCircleOutline,
      duplicateOutline,
      logOutOutline 
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}