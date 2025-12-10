import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class NewsListPage implements OnInit {

  newsList: any[] = [];
  userParams: any;
  imgUrl = environment.apiKey + 'uploads/'; // Base URL untuk gambar

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private router: Router
  ) { 
    // Ambil data user yang sedang login buat ditampilkan namanya
    this.userParams = this.authService.getUser();
  }

  ngOnInit() {
    // Kita pakai ionViewWillEnter biar refresh tiap kali masuk
  }

  ionViewWillEnter() {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (res: any) => {
        // Karena format JSON kita array of objects
        this.newsList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Fungsi Logout
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}