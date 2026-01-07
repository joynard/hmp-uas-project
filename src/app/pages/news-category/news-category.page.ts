import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from 'src/app/services/news'; 
import { environment } from 'src/environments/environment';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton, // Tombol Back di pojok kiri atas
  IonList, 
  IonItem, 
  IonLabel, 
  IonCard,       // Card Berita
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonImg, 
  IonSpinner,    // Loading Spinner
  IonText,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { newspaperOutline } from 'ionicons/icons';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.page.html',
  styleUrls: ['./news-category.page.scss'], 
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
    IonBackButton, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonImg, 
    IonSpinner, 
    IonText,
    IonIcon
  ]
})
export class NewsCategoryPage implements OnInit {

  categoryId: string = '';
  newsList: any[] = [];
  isLoading: boolean = true;
  
  imgUrl = environment.apiKey + 'uploads/'; // Pastikan path ini benar sesuai service lain

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { 
    addIcons({ newspaperOutline });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    if (this.categoryId) {
      this.loadNews();
    }
  }

  loadNews() {
    this.isLoading = true;
    this.newsService.getNewsByCategory(this.categoryId).subscribe({
      next: (res: any) => {
        this.newsList = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}