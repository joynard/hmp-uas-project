import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';   
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink], 
})
export class HomePage implements OnInit {
  
  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.user = this.authService.getUser();
    
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}