import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';

import { CategoryService } from 'src/app/services/category'; 
import { RouterLink } from '@angular/router';

import { addIcons } from 'ionicons';
import { add, pricetagOutline, pricetagsOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class CategoriesPage implements OnInit {

  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private loadingCtrl: LoadingController
  ) { 
    addIcons({ add, pricetagOutline, pricetagsOutline, chevronDownCircleOutline }); 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData(false); 
  }

  // Jalan saat user menarik layar (Pull to Refresh)
  handleRefresh(event: any) {
    this.loadData(true, event);
  }

  // Logic Gabungan
  async loadData(isRefresher: boolean = false, event?: any) {
    let loading: any;

    // Jika BUKAN refresher, tampilkan Loading Spinner Besar
    if (!isRefresher) {
      loading = await this.loadingCtrl.create({ message: 'Memuat kategori...' });
      await loading.present();
    }

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        
        // Matikan loading sesuai jenisnya
        if (isRefresher && event) {
          event.target.complete(); // Matikan animasi tarik
        } else if (loading) {
          loading.dismiss(); // Matikan loading fullscreen
        }
      },
      error: (err) => {
        console.error(err);
        if (isRefresher && event) {
          event.target.complete();
        } else if (loading) {
          loading.dismiss();
        }
      }
    });
  }
}