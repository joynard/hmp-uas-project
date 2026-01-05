import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

// Import Icon untuk tombol hapus (sampah)
import { addIcons } from 'ionicons';
import { trashOutline, newspaperOutline } from 'ionicons/icons';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyFavoritesPage implements OnInit {

  favorites: any[] = [];
  user: any = {};
  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    // Registrasi icon
    addIcons({ trashOutline, newspaperOutline });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  // Gunakan ionViewWillEnter agar data selalu refresh saat Tab dibuka
  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.newsService.getMyFavorites(this.user.id).subscribe({
      next: (res: any) => {
        // Asumsi API mengembalikan array berita
        this.favorites = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/news-detail', id]);
  }

  // Fitur Hapus Favorit langsung dari List
  async removeFavorite(event: any, news_id: number) {
    // Mencegah klik tembus ke Card (agar tidak masuk ke halaman detail)
    event.stopPropagation();

    const loading = await this.loadingCtrl.create({ message: 'Menghapus...' });
    await loading.present();

    this.newsService.toggleFavorite(news_id, this.user.id).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if (res.result === 'success') {
          this.showToast('Berita dihapus dari favorit');
          this.loadFavorites(); // Refresh list otomatis
        }
      },
      error: () => {
        loading.dismiss();
        this.showToast('Gagal menghapus');
      }
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 1500 });
    toast.present();
  }
}