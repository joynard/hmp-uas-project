import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
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
  IonInput,        
  IonTextarea,     
  IonSelect,       
  IonSelectOption, 
  IonText,
  IonThumbnail,
  IonImg,
  IonBackButton,
  IonToast 
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
    IonBackButton,
    IonToast 
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

  // variable toast
  isToastOpen = false;
  toastMessage = '';

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {
    addIcons({ 
      paperPlaneOutline, newspaperOutline, gridOutline, 
      documentTextOutline, imageOutline, imagesOutline, checkmarkCircle
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

  // display toast
  showToast(msg: string) {
    this.toastMessage = msg;
    this.isToastOpen = true;
    this.cdr.detectChanges(); // refresh
  }

  submit() {
    // validasi input wajib
    if (!this.title || !this.description || !this.mainPhoto || this.selectedCategories.length === 0) {
      this.showToast('Judul, Deskripsi, Kategori, dan Foto Utama wajib diisi!');
      return;
    }

    // validasi jumlah foto (MIN 4 - MAX 12)
    const totalGaleri = this.extraPhotos.length;

    if (totalGaleri < 4) {
      this.showToast(`Minimal wajib upload 4 foto galeri! (Kamu pilih: ${totalGaleri})`);
      return;
    }

    if (totalGaleri > 12) {
      this.showToast(`Maksimal hanya boleh 12 foto galeri! (Kamu pilih: ${totalGaleri})`);
      return;
    }

    // if validasi lolos --> lanjut proses upload
    const formData = new FormData();
    formData.append('user_id', this.user.id);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('categories', this.selectedCategories.join(','));
    formData.append('photo', this.mainPhoto);

    this.extraPhotos.forEach((file) => {
      formData.append('images[]', file);
    });

    // display notif proses pas upload foto
    this.showToast('Sedang mengupload berita & foto...');

    this.newsService.createNews(formData).subscribe({
      next: (res: any) => {
        if (res.result === 'success') {
          this.showToast('Berita berhasil diterbitkan!');
          setTimeout(() => {
            this.router.navigateByUrl('/app/home');
          }, 1500);
        } else {
          // catch error dari php exmp: judul sama
          this.showToast(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.showToast('Gagal koneksi ke server.');
      }
    });
  }
}