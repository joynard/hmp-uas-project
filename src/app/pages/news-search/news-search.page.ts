// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule, LoadingController } from '@ionic/angular';
// import { CategoryService } from 'src/app/services/category';
// import { RouterLink } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.page.html',
  styleUrls: ['./news-search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class NewsSearchPage implements OnInit {

  searchQuery: string = ''; // String untuk menyimpan teks pencarian user
  allNews: any[] = []; // Array semua berita yang ada (data asli)
  filteredNews: any[] = []; // Array berita hasil pencarian
  hasSearched: boolean = true; // Untuk melacak apakah pencarian sudah dilakukan
  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private newsService: NewsService, // akses data berita dari service
    private router: Router // untuk navigasi ke detail
  ) { }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (res: any) => {
        // Karena format JSON kita array of objects
        this.allNews = res;
        this.filteredNews = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit() {
    this.filteredNews = []; 
    // this.loadNews();
    // Kosongkan hasil pencarian (belum search)
    
  }

  ionViewWillEnter() {
    this.loadNews();
  }

  // Method dipanggil tiap kali pengguna mengetik di search bar
  handleSearch(event: any) {

    // Ambil teks input & ubah ke lowercase supaya pencarian case-insensitive
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;

    // Set nilai: user sudah melakukan search
    this.hasSearched = true; // Ubah hasSearched menjadi true saat search dilakukan

    // Jika input tidak kosong
    if (query && query.trim() !== '') {
      
      // Filter daftar berita berdasarkan judul yang cocok dengan query
      this.filteredNews = this.allNews.filter((berita) => {
        return berita.title.toLowerCase().includes(query);
      });
    } else {
      this.filteredNews = this.allNews; // If search bar kosong kosongkan juga hasilnya
    }
    
  }

  //Navigasi ke halaman detail berita.
  goToDetail(id: string) {
    // Kirim parameter lewat state Angular Router
    this.router.navigate(['./news-detail/'+id], { state: { beritaId: id } });
    
  }
}
