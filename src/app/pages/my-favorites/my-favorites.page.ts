import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonImg, 
  IonButton,     // Tombol Hapus
  IonIcon,       // Ikon Sampah
  IonText,
  IonThumbnail,  // Jika tampilan list pakai thumbnail kecil
  IonButtons, IonMenuButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { trashOutline, newspaperOutline } from 'ionicons/icons';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonImg, 
    IonButton, 
    IonIcon, 
    IonText,
    IonThumbnail,
    IonButtons, IonMenuButton
  ]
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
    addIcons({ trashOutline, newspaperOutline });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.newsService.getMyFavorites(this.user.id).subscribe({
      next: (res: any) => {
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

  async removeFavorite(event: any, news_id: number) {
    event.stopPropagation();

    const loading = await this.loadingCtrl.create({ message: 'Menghapus...' });
    await loading.present();

    this.newsService.toggleFavorite(news_id, this.user.id).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if (res.result === 'success') {
          this.showToast('Berita dihapus dari favorit');
          this.loadFavorites(); 
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