import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category';

import { addIcons } from 'ionicons';
import { pricetagOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.page.html',
  styleUrls: ['./category-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CategoryCreatePage implements OnInit {

  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private toastCtrl: ToastController,
    private navCtrl: NavController // Untuk tombol Back
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