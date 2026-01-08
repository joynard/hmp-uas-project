import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonInput, 
  IonButton, 
  IonIcon, 
  IonText,
  IonImg,
  IonToast 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, newspaper } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
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
    IonImg,
    IonToast 
  ]
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';

  // state toast
  isToastOpen = false;
  toastMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone 
  ) {
    addIcons({ mailOutline, lockClosedOutline, newspaper });
   }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/app/home');
    }
  }

  setOpen(isOpen: boolean, msg: string = '') {
    this.toastMessage = msg;
    this.isToastOpen = isOpen;
  }

  async login() {
    if (!this.email || !this.password) {
      this.setOpen(true, 'Email dan Password harus diisi!');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.result === 'success') {
          this.authService.saveSession(response.data);
          
          this.setOpen(true, 'Selamat datang, ' + response.data.fullname);
          
          this.zone.run(() => {
            this.router.navigateByUrl('/app/home');
          });

        } else {
          this.setOpen(true, response.message || 'Login gagal!');
        }
      },
      error: (err) => {
        this.setOpen(true, 'Terjadi kesalahan koneksi: ' + err.message);
      }
    });
  }
}