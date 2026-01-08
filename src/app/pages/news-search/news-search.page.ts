import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { NewsService } from 'src/app/services/news'; 
import { environment } from 'src/environments/environment';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonSearchbar, // <--- PENTING UTK HALAMAN SEARCH
  IonList, 
  IonItem, 
  IonLabel, 
  IonAvatar, 
  IonImg, 
  IonText,
  IonIcon,
  IonButtons,
  IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.page.html',
  styleUrls: ['./news-search.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonSearchbar, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonAvatar, 
    IonImg, 
    IonIcon,
    IonButtons,
    IonMenuButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle
  ]
})
export class NewsSearchPage implements OnInit {

  searchQuery: string = '';
  allNews: any[] = [];
  filteredNews: any[] = [];
  
  hasSearched: boolean = false; 
  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (res: any) => {
        this.allNews = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;
    this.hasSearched = true;

    if (query && query.trim() !== '') {
      this.filteredNews = this.allNews.filter((berita) => {
        return berita.title.toLowerCase().includes(query);
      });
    } else {
      this.filteredNews = [];
      this.hasSearched = false; 
    }
  }

  goToDetail(id: any) {
    this.router.navigate(['/news-detail', id]);
  }
}