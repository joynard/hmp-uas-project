import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { NewsService } from '../services/news';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class HomePage implements OnInit {
  
  user: any = {};
  highlights: any[] = [];
  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private authService: AuthService,
    private newsService: NewsService
  ) {}

  ionViewWillEnter() {
    this.user = this.authService.getUser();
    this.loadHighlights();
  }

  ngOnInit() {}

  loadHighlights() {
    // Ambil berita, tapi nanti di HTML kita batasi tampilannya (misal cuma 3-5)
    this.newsService.getNews().subscribe((res: any) => {
      // Ambil 5 berita terbaru saja untuk highlight
      this.highlights = res.slice(0, 5);
    });
  }
}