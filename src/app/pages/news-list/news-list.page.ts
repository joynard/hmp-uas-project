import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonList, 
  IonItem, 
  IonLabel,
  IonCard,          // <--- PENTING UTK CARD BERITA
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonBackButton, IonSpinner
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { logOutOutline, star, chatbubbleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonList, 
    IonItem, 
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonBackButton, IonSpinner
  ]
})
export class NewsListPage implements OnInit {

  newsList: any[] = [];
  userParams: any;
  imgUrl = environment.apiKey + 'uploads/'; 

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.userParams = this.authService.getUser();
    addIcons({ logOutOutline, star, chatbubbleOutline });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (res: any) => {
        this.newsList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}