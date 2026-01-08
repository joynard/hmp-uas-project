import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController, LoadingController } from '@ionic/angular'; 

import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonItem, 
  IonInput,    
  IonButton, 
  IonIcon, 
  IonLabel,  
  IonList,
  IonToggle,     
  IonButtons, 
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonSpinner
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
    IonButtons, IonMenuButton, IonRefresher, IonRefresherContent, IonSpinner
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef 
  ) { 
    addIcons({ camera, logOutOutline, moon, personOutline, chevronDownCircleOutline });
  }

  ngOnInit() {
    this.isDark = this.authService.isDarkMode();
    this.currentTheme = localStorage.getItem('theme_color') || 'blue';
  }

  ionViewDidEnter() {
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.authService.getUser();
    if(this.user) {
      this.editName = this.user.fullname;
    } 
    this.cdr.detectChanges(); 
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

  // --- FUNGSI SIMPAN DENGAN DETEKTIF ALERT ---
  async saveProfile() {
    // 1. CEK TOMBOL
    alert('1. Tombol ditekan'); 

    // 2. CEK DATA USER
    if (!this.user || !this.user.id) {
      alert('ERROR: Data User Hilang/Null. Silakan Login ulang.');
      return;
    }

    if (!this.editName) {
      alert('Nama kosong!');
      return;
    }

    try {
      // 3. COBA TAMPILKAN LOADING
      alert('2. Mencoba loading...');
      const loading = await this.loadingCtrl.create({ 
        message: 'Menyimpan...',
        spinner: 'crescent'
      });
      await loading.present();

      // 4. KIRIM REQUEST
      alert('3. Mengirim ke server: ' + environment.apiKey);
      
      this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
        next: async (res: any) => {
          await loading.dismiss(); 
          alert('4. Response: ' + JSON.stringify(res)); // LIHAT HASILNYA

          if(res.result === 'success') {
            this.authService.saveSession(res.data);
            this.user = res.data; 
            this.selectedFile = null; 
            this.cdr.detectChanges(); 
            // alert('SUKSES!');
          } else {
            // alert('GAGAL API: ' + res.message);
          }
        },
        error: async (err) => {
          await loading.dismiss();
          alert('ERROR HTTP: ' + JSON.stringify(err)); // LIHAT ERRORNYA
        }
      });

    } catch (e) {
      alert('CRASH SYSTEM: ' + e);
    }
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