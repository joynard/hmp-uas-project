import { Component, OnInit, NgZone } from '@angular/core'; // 1. Tambah NgZone
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

import { addIcons } from 'ionicons'; // Import addIcons
import { mailOutline, lockClosedOutline, newspaper } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private zone: NgZone // 2. Inject NgZone di sini
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
          
          // 3. SOLUSI: Bungkus navigasi dengan NgZone.run()
          // Ini memaksa Angular untuk segera update tampilan tanpa menunggu refresh
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
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}