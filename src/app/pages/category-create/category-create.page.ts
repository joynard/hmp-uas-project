import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton, // Tombol Kembali
  IonItem, 
  IonInput,      // Input Nama Kategori
  IonButton, 
  IonIcon,
  IonList
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { pricetagOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.page.html',
  styleUrls: ['./category-create.page.scss'],
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
    IonBackButton, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    IonList
  ]
})
export class CategoryCreatePage implements OnInit {

  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { addIcons({ pricetagOutline });}

  ngOnInit() {
  }

  submit() {
    if(!this.name) {
      this.showToast('Nama kategori harus diisi!');
      return;
    }

    this.categoryService.createCategory(this.name).subscribe({
      next: (res: any) => {
        if(res.result === 'success') {
          this.showToast('Kategori berhasil dibuat!');
          this.navCtrl.back(); 
        } else {
          this.showToast(res.message);
        }
      },
      error: (err) => {
        this.showToast('Gagal koneksi: ' + JSON.stringify(err));
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