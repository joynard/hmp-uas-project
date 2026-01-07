import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { NewsService } from 'src/app/services/news';
import { CategoryService } from 'src/app/services/category';
import { AuthService } from 'src/app/services/auth';

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
  IonInput,        // Judul Berita
  IonTextarea,     // Deskripsi Berita
  IonSelect,       // Dropdown Kategori
  IonSelectOption, // Pilihan Kategori
  IonText,
  IonThumbnail,
  IonImg,
  IonBackButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  paperPlaneOutline, 
  newspaperOutline, 
  gridOutline, 
  documentTextOutline, 
  imageOutline, 
  imagesOutline,
  checkmarkCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.page.html',
  styleUrls: ['./news-create.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule, 
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
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonText,
    IonThumbnail,
    IonImg,
    IonBackButton
  ]
})
export class NewsCreatePage implements OnInit {

  title: string = '';
  description: string = '';
  selectedCategories: any[] = []; 
  
  mainPhoto: File | null = null;
  extraPhotos: File[] = [];

  categories: any[] = [];
  user: any = {};

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    addIcons({ 
      paperPlaneOutline, 
      newspaperOutline, 
      gridOutline, 
      documentTextOutline, 
      imageOutline, 
      imagesOutline,
      checkmarkCircle
    });
   }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  onMainPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mainPhoto = file;
    }
  }

  onExtraPhotosSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.extraPhotos = Array.from(event.target.files);
    }
  }

  async submit() {
    if (!this.title || !this.description || !this.mainPhoto || this.selectedCategories.length === 0) {
      this.showToast('Judul, Deskripsi, Kategori, dan Foto Utama wajib diisi!');
      return;
    }

    if (this.extraPhotos.length < 1) {
      this.showToast('Sebaiknya sertakan foto tambahan untuk detail berita.');
    }

    const formData = new FormData();
    formData.append('user_id', this.user.id);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('categories', this.selectedCategories.join(','));
    formData.append('photo', this.mainPhoto);

    this.extraPhotos.forEach((file) => {
      formData.append('images[]', file);
    });

    this.newsService.createNews(formData).subscribe({
      next: (res: any) => {
        if (res.result === 'success') {
          this.showToast('Berita berhasil diterbitkan!');
          this.navCtrl.back();
        } else {
          this.showToast(res.message);
        }
      },
      error: (err) => {
        this.showToast('Gagal upload: ' + JSON.stringify(err));
      }
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}