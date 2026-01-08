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
  IonText,
  IonSpinner
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
    IonText,
    IonSpinner
  ]
})
export class CategoriesPage implements OnInit {

  categories: any[] = [];
  isLoading: boolean = true;

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

  loadData(isRefresher: boolean = false, event?: any) {
    // Jika bukan refresh tarik, nyalakan loading layar
    if (!isRefresher) {
      this.isLoading = true;
    }

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.categories = res;
        } else if (res && res.data && Array.isArray(res.data)) {
          this.categories = res.data;
        } else {
          this.categories = [];
        }
        this.isLoading = false; // destroy loading
        this.cdr.detectChanges();
        
        if (isRefresher && event) event.target.complete();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false; 
        this.cdr.detectChanges();
        if (isRefresher && event) event.target.complete();
      }
    });
  }
}