import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Hapus RouterLink tak terpakai
import { NewsService } from 'src/app/services/news'; // Sesuaikan path service kamu
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.page.html',
  styleUrls: ['./news-search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class NewsSearchPage implements OnInit {

  searchQuery: string = '';
  allNews: any[] = [];
  filteredNews: any[] = [];
  
  // UBAH JADI FALSE: Agar tampilan awal "Ayo Cari Berita" muncul
  hasSearched: boolean = false; 
  
  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit() {
    // Kita load data sekali saja saat awal
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (res: any) => {
        this.allNews = res;
        // Kita tidak mengisi filteredNews disini agar layar tetap bersih sebelum search
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
        // Search berdasarkan Judul
        return berita.title.toLowerCase().includes(query);
      });
    } else {
      // Jika dihapus, kosongkan lagi
      this.filteredNews = [];
      this.hasSearched = false; // Reset state
    }
  }

  goToDetail(id: any) {
    // PERBAIKAN PENTING: Gunakan /news-detail (bukan ./news-detail)
    // Sesuai dengan routes yang kita buat sebelumnya
    this.router.navigate(['/news-detail', id]);
  }
}