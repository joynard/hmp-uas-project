import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// Import Service Controller (Manual)
import { ToastController, LoadingController } from '@ionic/angular'; 

// --- IMPORT STANDALONE COMPONENTS ---
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
  IonRefresherContent
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { camera, logOutOutline, moon, personOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
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
    IonRefresherContent
  ]
})
export class ProfilePage implements OnInit {

  user: any = null; // Default null agar di HTML bisa kita cek *ngIf
  editName: string = '';
  selectedFile: File | null = null;
  imgUrl = environment.apiKey + 'uploads/';

  isDark: boolean = false;
  currentTheme: string = 'blue';

  public refreshIcon = chevronDownCircleOutline;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController, // Inject Loading
    private toastCtrl: ToastController,     // Inject Toast
    private cdr: ChangeDetectorRef          // Inject CDR (Obat Refresh)
  ) { 
    addIcons({ camera, logOutOutline, moon, personOutline, chevronDownCircleOutline });
  }

  ngOnInit() {
    this.isDark = this.authService.isDarkMode();
    this.currentTheme = localStorage.getItem('theme_color') || 'blue';
  }

  // Dipanggil SETIAP KALI halaman akan tampil (bukan cuma sekali saat init)
  ionViewWillEnter() {
    this.loadUserData();
  }

  loadUserData() {
    // 1. Ambil data
    this.user = this.authService.getUser();
    
    // 2. Isi form
    if(this.user) {
      this.editName = this.user.fullname;
    } else {
      this.router.navigateByUrl('/login');
    }
    
    // 3. OBAT AMPUH: Paksa update tampilan DETIK INI JUGA
    // Ini yang memperbaiki masalah "harus refresh dulu baru muncul"
    this.cdr.detectChanges(); 
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadUserData();
      event.target.complete();
    }, 1000);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async saveProfile() {
    // Validasi
    if (!this.editName) {
      this.showToast('Nama tidak boleh kosong!');
      return;
    }

    // 1. TAMPILKAN LOADING DULUAN (Supaya user tau tombolnya bereaksi)
    const loading = await this.loadingCtrl.create({ 
      message: 'Menyimpan...',
      spinner: 'crescent'
    });
    await loading.present();

    // 2. Kirim ke Server
    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: async (res: any) => {
        await loading.dismiss(); // Tutup loading
        
        if(res.result === 'success') {
          // Update Session Lokal
          this.authService.saveSession(res.data);
          this.user = res.data; 
          
          this.selectedFile = null; 
          this.showToast('Profil berhasil diperbarui!');
          
          // Update Tampilan Lagi
          this.cdr.detectChanges(); 
        } else {
          this.showToast('Gagal update: ' + res.message);
        }
      },
      error: async (err) => {
        await loading.dismiss();
        console.error(err);
        this.showToast('Gagal koneksi ke server.');
      }
    });
  }

  // Helper untuk menampilkan Toast Manual
  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'dark',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
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