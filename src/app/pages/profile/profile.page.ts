import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { camera, logOutOutline, moon, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
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
    // 1. Load Data User
    this.user = this.authService.getUser();
    if(this.user) {
      this.editName = this.user.fullname;
    }

    // 2. Load Theme State
    this.isDark = this.authService.isDarkMode();
    this.currentTheme = localStorage.getItem('theme_color') || 'blue';
  }

  // Handle Pilih File Foto
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Preview gambar secara lokal sebelum upload (UX trick)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatar = null; // Hack utk trigger change
        // Kita timpa tampilan sementara (belum kesimpan di server)
        // Note: Ini hanya preview, upload terjadi saat tombol Simpan ditekan
      };
      reader.readAsDataURL(file);
    }
  }

  // Simpan Profil (Nama & Foto)
  async saveProfile() {
    const loading = await this.loadingCtrl.create({ message: 'Menyimpan...' });
    await loading.present();

    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: (res: any) => {
        loading.dismiss();
        if(res.result === 'success') {
          this.authService.saveSession(res.data);
          this.user = res.data;
          
          this.selectedFile = null; // Reset file agar tidak di-upload ulang

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

  // Ganti Tema Warna
  changeTheme(color: string) {
    this.currentTheme = color;
    this.authService.setTheme(color);
  }

  // Toggle Dark Mode
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