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

  // --- FUNGSI SIMPAN VERSI FINAL (TANPA LOADING CONTROLLER) ---
  async saveProfile() {
    // 1. Validasi
    if (!this.editName) {
      alert('Nama tidak boleh kosong!');
      return;
    }

    // 2. Tanda visual manual (tanpa Controller)
    // Kita ubah teks tombol lewat variable (kalau mau) atau biarkan saja
    // Yang penting kita pastikan request terkirim
    alert('Proses dimulai... Mengirim data ke server.');

    // 3. LANGSUNG KIRIM (Tanpa await loading)
    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: (res: any) => {
        // ALERT 4: RESPON SERVER
        alert('Server Response: ' + JSON.stringify(res)); 

        if(res.result === 'success') {
          this.authService.saveSession(res.data);
          this.user = res.data; 
          this.selectedFile = null; 
          this.cdr.detectChanges(); 
          
          alert('BERHASIL! Profil sudah diperbarui.'); // Pakai alert biasa biar pasti muncul
        } else {
          alert('GAGAL: ' + res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('ERROR KONEKSI: ' + JSON.stringify(err));
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