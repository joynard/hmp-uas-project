import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { NewsService } from 'src/app/services/news';
import { CategoryService } from 'src/app/services/category';
import { AuthService } from 'src/app/services/auth';

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
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewsCreatePage implements OnInit {

  // Variabel Form
  title: string = '';
  description: string = '';
  selectedCategories: any[] = []; // Array ID kategori yang dipilih
  
  // Variabel File
  mainPhoto: File | null = null;
  extraPhotos: File[] = [];

  // Data Pendukung
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

  // Handle File Input: Foto Utama
  onMainPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mainPhoto = file;
    }
  }

  // Handle File Input: Foto Tambahan (Detail)
  onExtraPhotosSelected(event: any) {
    // Ambil multiple files
    if (event.target.files && event.target.files.length > 0) {
      // Convert FileList ke Array biasa
      this.extraPhotos = Array.from(event.target.files);
    }
  }

  async submit() {
    // Validasi Input [cite: 13, 23]
    if (!this.title || !this.description || !this.mainPhoto || this.selectedCategories.length === 0) {
      this.showToast('Judul, Deskripsi, Kategori, dan Foto Utama wajib diisi!');
      return;
    }

    // Validasi Foto Tambahan (Minimal 4 sesuai soal? atau opsional dulu?)
    // Di soal  dibilang "disediakan 4 lembar", kita warning saja kalau kurang
    if (this.extraPhotos.length < 1) {
      this.showToast('Sebaiknya sertakan foto tambahan untuk detail berita.');
      // return; // Kalau mau strict (wajib), uncomment baris ini
    }

    // Siapkan FormData
    const formData = new FormData();
    formData.append('user_id', this.user.id);
    formData.append('title', this.title);
    formData.append('description', this.description);
    
    // Kirim Array Kategori sebagai string dipisah koma (contoh: "1,3,5")
    formData.append('categories', this.selectedCategories.join(','));

    // Append Main Photo
    formData.append('photo', this.mainPhoto);

    // Append Extra Photos (Looping)
    // Note: Di PHP kita menangkapnya sebagai name="images[]"
    this.extraPhotos.forEach((file) => {
      formData.append('images[]', file);
    });

    // Kirim ke Server
    this.newsService.createNews(formData).subscribe({
      next: (res: any) => {
        if (res.result === 'success') {
          this.showToast('Berita berhasil diterbitkan!');
          this.navCtrl.back(); // Kembali ke dashboard
        } else {
          // Handle validasi judul kembar dari PHP [cite: 25]
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