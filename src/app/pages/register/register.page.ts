import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';
import { ToastController } from '@ionic/angular'; 

// --- IMPORT STANDALONE COMPONENTS ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonInput,
  IonButton, 
  IonIcon, 
  IonButtons, IonBackButton, IonList, IonToast
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    IonButtons, IonBackButton, IonList, IonToast
  ]
})
export class RegisterPage implements OnInit {

  fullname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  isToastOpen = false;
  toastMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { addIcons({ personOutline, mailOutline, lockClosedOutline });}

  ngOnInit() { }

  isValidEmail(email: string) {
    // mengecek harus ada karakter + @ + karakter + . + karakter
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  async register() {
    // kosong
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      this.setOpen(true, 'Semua kolom harus diisi!');
      return;
    }

    // format email
    if (!this.isValidEmail(this.email)) {
      this.setOpen(true, 'Format email salah! (Contoh: user@domain.com)');
      return;
    }

    // nama nda bole angka
    const hasNumber = /\d/; 
    if (hasNumber.test(this.fullname)) {
      this.setOpen(true, 'Nama tidak boleh mengandung angka!');
      return;
    }

    // panjang password
    if (this.password.length < 8) {
      this.setOpen(true, 'Password minimal 8 karakter!');
      return;
    }

    // konfirmasi password
    if (this.password !== this.confirmPassword) {
      this.setOpen(true, 'Konfirmasi password tidak cocok!');
      return;
    }

    this.authService.register(this.fullname, this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.result === 'success') {
          this.setOpen(true, 'Register Berhasil! Silahkan Login.');
          this.router.navigateByUrl('/login');
        } else {
          // catch error dari php
          this.setOpen(true, response.message);
        }
      },
      error: (err) => {
        this.setOpen(true, 'Gagal koneksi: ' + JSON.stringify(err));
      }
    });
  }

  setOpen(isOpen: boolean, msg: string = '') {
    this.toastMessage = msg;
    this.isToastOpen = isOpen;
  }
}