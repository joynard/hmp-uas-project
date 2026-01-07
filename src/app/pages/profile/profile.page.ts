import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController, LoadingController } from '@ionic/angular';

// --- IMPORT STANDALONE COMPONENTS ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonInput,    // <--- WAJIB ADA (Untuk Edit Nama)
  IonButton, 
  IonIcon, 
  IonLabel,
  IonAvatar,   // Untuk Foto Profil
  IonList,
  IonToggle,   // Untuk Switch Dark Mode
  IonImg,     // Untuk menampilkan gambar preview
  IonButtons, IonMenuButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { camera, logOutOutline, moon, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN KE SINI ---
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon, 
    IonLabel,
    IonAvatar,
    IonList,
    IonToggle,
    IonImg,
    IonButtons, 
    IonMenuButton
  ]
})
export class ProfilePage implements OnInit {

  user: any = {};
  editName: string = '';
  selectedFile: File | null = null;
  imgUrl = environment.apiKey + 'uploads/';

  // Theme State
  isDark: boolean = false;
  currentTheme: string = 'blue';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { 
    addIcons({ camera, logOutOutline, moon, personOutline });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    if(this.user) {
      this.editName = this.user.fullname;
    }

    this.isDark = this.authService.isDarkMode();
    this.currentTheme = localStorage.getItem('theme_color') || 'blue';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Kita update avatar object lokal untuk preview
        // Pastikan di HTML kamu pakai [src]="selectedFile ? previewUrl : serverUrl"
        // atau cara hacky ini (kurang ideal tapi jalan):
        this.user.avatar = null; 
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProfile() {
    const loading = await this.loadingCtrl.create({ message: 'Menyimpan...' });
    await loading.present();

    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if(res.result === 'success') {
          this.authService.saveSession(res.data);
          this.user = res.data;
          this.selectedFile = null; 
          this.showToast('Profil berhasil diperbarui!');
        } else {
          this.showToast('Gagal update.');
        }
      },
      error: (err) => {
        loading.dismiss();
        this.showToast('Error koneksi.');
      }
    });
  }

  changeTheme(color: string) {
    this.currentTheme = color;
    this.authService.setTheme(color);
  }

  toggleDark(event: any) {
    this.authService.toggleDarkMode(event.detail.checked);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000 });
    toast.present();
  }
}