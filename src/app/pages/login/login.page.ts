import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonList, 
  IonItem, 
  IonInput,     // <--- WAJIB ADA (Supaya bisa ngetik)
  IonButton, 
  IonIcon, 
  IonText,
  IonImg
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, newspaper } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonList, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon, 
    IonText,
    IonImg
  ]
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private zone: NgZone 
  ) {
    addIcons({ mailOutline, lockClosedOutline, newspaper });
   }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/app/home');
    }
  }

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Email dan Password harus diisi!');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.result === 'success') {
          this.authService.saveSession(response.data);
          this.presentToast('Selamat datang, ' + response.data.fullname);
          
          this.zone.run(() => {
            this.router.navigateByUrl('/app/home');
          });

        } else {
          this.presentToast(response.message || 'Login gagal!');
        }
      },
      error: (err) => {
        this.presentToast('Terjadi kesalahan koneksi: ' + err.message);
      }
    });
  }

  async presentToast(msg: string) {
  // Debugging: Cek di Console apakah fungsi ini terpanggil
  console.log('Mencoba menampilkan Toast:', msg); 

  try {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,     // Durasi agak lamaan dikit (3 detik)
      position: 'top',    // Ganti ke TOP (Atas) biar paling aman dari keyboard
      color: 'danger',    // Ganti ke MERAH (Biar mencolok mata kalau muncul)
    });

    await toast.present(); // WAJIB ADA AWAIT
    console.log('Toast berhasil di-present');
  } catch (e) {
    console.error('Gagal memunculkan Toast:', e);
  }
}
}