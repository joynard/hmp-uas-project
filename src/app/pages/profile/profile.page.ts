import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput,    
  IonButton, IonIcon, IonLabel, IonList, IonToggle, IonButtons, 
  IonMenuButton, IonRefresher, IonRefresherContent, IonSpinner,
  IonToast 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { camera, logOutOutline, moon, personOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonTitle, 
    IonItem, IonInput, IonButton, IonIcon, IonLabel, IonList, IonToggle, 
    IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonSpinner,
    IonToast
  ]
})
export class ProfilePage implements OnInit {

  user: any = null;
  editName: string = '';
  selectedFile: File | null = null;
  imgUrl = environment.apiKey + 'uploads/';
  isDark: boolean = false;
  currentTheme: string = 'blue';
  public refreshIcon = chevronDownCircleOutline;

  isToastOpen = false;
  toastMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) { 
    addIcons({ camera, logOutOutline, moon, personOutline, chevronDownCircleOutline });
  }

  ngOnInit() {
    this.isDark = this.authService.isDarkMode();
    this.currentTheme = localStorage.getItem('theme_color') || 'blue';
  }
  
  ionViewWillEnter() {
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.authService.getUser(); // get data session dari local storage user
    if(this.user) {
      this.editName = this.user.fullname;
    } 
    this.cdr.detectChanges(); 
  }

  getAvatar(): string {
    if (this.user && this.user.avatar) {
      return this.imgUrl + this.user.avatar;
    }
    return 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadUserData();
      event.target.complete();
      this.cdr.detectChanges();
    }, 1000);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  setOpen(isOpen: boolean, msg: string = '') {
    this.toastMessage = msg;
    this.isToastOpen = isOpen;
    this.cdr.detectChanges(); 
  }

  async saveProfile() {
    if (!this.editName) {
      this.setOpen(true, 'Nama tidak boleh kosong!');
      return;
    }

    this.isLoading = true; 

    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        
        if(res.result === 'success') {
          // update session
          this.authService.saveSession(res.data);
          
          // update variable user local
          this.user = res.data; 
          this.selectedFile = null; 
          
          this.setOpen(true, 'Profil berhasil diperbarui!');
          this.cdr.detectChanges(); 
        } else {
          this.setOpen(true, 'Gagal update: ' + res.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.setOpen(true, 'Gagal koneksi server.');
      }
    });
  }

  changeTheme(color: string) {
    this.currentTheme = color;
    this.authService.setTheme(color);
  }

  toggleDark(event: any) {
    this.authService.toggleDarkMode(event.detail.checked);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}