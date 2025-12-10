import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category';
import { RouterLink } from '@angular/router';

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
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat kategori...' });
    await loading.present();

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        loading.dismiss();
      },
      error: (err) => {
        console.error(err);
        loading.dismiss();
      }
    });
  }
}