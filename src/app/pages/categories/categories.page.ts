import { Component, OnInit, ChangeDetectorRef, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular'; // Service tetap dari sini
import { CategoryService } from 'src/app/services/category'; 
import { RouterLink } from '@angular/router';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonRefresher,        // Tarik untuk Refresh
  IonRefresherContent, // Animasi Refresh
  IonFab,              // Tombol Bulat Melayang (Add)
  IonFabButton, 
  IonIcon, 
  IonButtons,
  IonMenuButton,
  IonText
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, pricetagOutline, pricetagsOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
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
    IonLabel, 
    IonRefresher, 
    IonRefresherContent, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonButtons,
    IonMenuButton,
    IonText
  ]
})
export class CategoriesPage implements OnInit {

  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { 
    addIcons({ add, pricetagOutline, pricetagsOutline, chevronDownCircleOutline }); 
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData(false); 
  }

  handleRefresh(event: any) {
    this.loadData(true, event);
  }

  async loadData(isRefresher: boolean = false, event?: any) {
    let loading: any;

    if (!isRefresher) {
      loading = await this.loadingCtrl.create({ message: 'Memuat kategori...' });
      await loading.present();
    }

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          
          if (Array.isArray(res)) {
            this.categories = res;
          } else if (res && res.data && Array.isArray(res.data)) {
            this.categories = res.data;
          } else {
            this.categories = [];
          }

          console.log('Data loaded:', this.categories); // debug console
          this.cdr.detectChanges(); 
        });
        
        if (isRefresher && event) event.target.complete(); 
        if (loading) loading.dismiss(); 
      },
      error: (err) => {
        console.error(err);
        if (isRefresher && event) event.target.complete();
        if (loading) loading.dismiss();
      }
    });
  }
}