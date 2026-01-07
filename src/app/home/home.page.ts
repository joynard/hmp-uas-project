import { Component, OnInit } from '@angular/core';
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
  IonRefresher,        // Jika pakai tarik-refresh
  IonRefresherContent  // Jika pakai tarik-refresh
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { arrowForwardOutline, addCircleOutline, gridOutline } from 'ionicons/icons';

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
    IonGrid, IonRow, IonCol,
  ],
})
export class HomePage implements OnInit {
  
  user: any = {};
  highlights: any[] = [];
  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private authService: AuthService,
    private newsService: NewsService
  ) { addIcons({ arrowForwardOutline, addCircleOutline, gridOutline }); }

  ionViewWillEnter() {
    this.user = this.authService.getUser();
    this.loadHighlights();
  }

  ngOnInit() {}

  loadHighlights() {
    this.newsService.getNews().subscribe((res: any) => {
      this.highlights = res.slice(0, 5);
    });
  }
}