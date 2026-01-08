import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { NewsService } from '../services/news';
import { environment } from 'src/environments/environment';

// IMPORT KOMPONEN UI YANG BIASA DIPAKAI DI HOME
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonIcon,
  IonGrid, 
  IonRow, 
  IonCol,
  IonRefresher,        
  IonRefresherContent,
  IonToast
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { arrowForwardOutline, addCircleOutline, gridOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI ATAS KE SINI ---
  imports: [
    CommonModule, 
    RouterLink,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonGrid, IonRow, IonCol, IonToast
  ],
})
export class HomePage implements OnInit {
  
  user: any = {};
  highlights: any[] = [];
  imgUrl = environment.apiKey + 'uploads/';

  isToastOpen = false;
  toastMessage = '';

  public refreshIcon = chevronDownCircleOutline;

  constructor(
    private authService: AuthService,
    private newsService: NewsService,
    private cdr: ChangeDetectorRef
  ) { addIcons({ arrowForwardOutline, addCircleOutline, gridOutline }); }

  ionViewWillEnter() {
    this.user = this.authService.getUser();
    this.loadHighlights();

    if (this.authService.justLoggedIn) {
      this.toastMessage = 'Selamat datang, ' + (this.user?.fullname || 'User');
      this.isToastOpen = true; // open toast
      
      this.authService.justLoggedIn = false; // reset flag
    }
  }

  ngOnInit() {}

  loadHighlights(event?: any) {
    this.newsService.getNews().subscribe((res: any) => {
      this.highlights = res.slice(0, 5);
      this.cdr.detectChanges(); // make sure always refresh
      if (event) {
        event.target.complete(); // complete the refresher
      }
    });
  }

  handleRefresh(event: any) {
    this.loadHighlights(event);
  }

}