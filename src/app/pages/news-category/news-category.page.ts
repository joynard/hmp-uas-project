import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from 'src/app/services/news'; 

// 1. IMPORT ENVIRONMENT
import { environment } from 'src/environments/environment';

import { addIcons } from 'ionicons';
import { newspaperOutline } from 'ionicons/icons';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.page.html',
  styleUrls: ['./news-category.page.scss'], 
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class NewsCategoryPage implements OnInit {

  categoryId: string = '';
  newsList: any[] = [];
  isLoading: boolean = true;
  
  // 2. DEFINISIKAN imgUrl DARI ENVIRONMENT
  imgUrl = environment.imgUrl;

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