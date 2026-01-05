import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RegisterPage implements OnInit {

  fullname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { addIcons({ personOutline, mailOutline, lockClosedOutline });}

  ngOnInit() { }

  async register() {
    // 1. Validasi Input Kosong
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      this.presentToast('Semua kolom harus diisi!');
      return;
    }

    // 2. Validasi Nama (Tidak boleh ada angka)
    const hasNumber = /\d/; 
    if (hasNumber.test(this.fullname)) {
      this.presentToast('Nama tidak boleh mengandung angka!');
      return;
    }

    // 3. Validasi Panjang Password
    if (this.password.length < 8) {
      this.presentToast('Password minimal 8 karakter!');
      return;
    }

    // 4. Validasi Konfirmasi Password
    if (this.password !== this.confirmPassword) {
      this.presentToast('Konfirmasi password tidak cocok!');
      return;
    }

    // UPDATE: Panggil service dengan parameter langsung (Bukan FormData)
    this.authService.register(this.fullname, this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.result === 'success') {
          this.presentToast('Register Berhasil! Silahkan Login.');
          this.router.navigateByUrl('/login');
        } else {
          this.presentToast(response.message);
        }
      },
      error: (err) => {
        this.presentToast('Gagal koneksi: ' + JSON.stringify(err));
      }
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}