import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  IonAvatar,   
  IonList,
  IonToggle,   
  IonImg,     
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
    IonAvatar,
    IonList,
    IonToggle,
    IonImg,
    IonButtons, 
    IonMenuButton,
    IonRefresher,
    IonRefresherContent  
  ]
})
export class ProfilePage implements OnInit {

  user: any = {};
  editName: string = '';
  selectedFile: File | null = null;
  imgUrl = environment.apiKey + 'uploads/';

  // theme State
  isDark: boolean = false;
  currentTheme: string = 'blue';

  public refreshIcon = chevronDownCircleOutline;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef 
  ) { 
    addIcons({ camera, logOutOutline, moon, personOutline, chevronDownCircleOutline });
  }

  ngOnInit() {
    this.loadUserData();
    this.isDark = this.authService.isDarkMode();
    this.currentTheme = localStorage.getItem('theme_color') || 'blue';
  }

  // load data user dari storage --> localstorage implementation
  loadUserData() {
    this.user = this.authService.getUser();
    if(this.user) {
      this.editName = this.user.fullname;
    }
  }

  // handle refresh
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

  async saveProfile() {
    // validasi input
    if (!this.editName) {
      this.showToast('Nama tidak boleh kosong!');
      return;
    }

    // display loading
    const loading = await this.loadingCtrl.create({ message: 'Menyimpan...' });
    await loading.present();

    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: async (res: any) => {
        await loading.dismiss(); // tutup loading
        
        if(res.result === 'success') {
          // update data session di device user
          this.authService.saveSession(res.data);
          this.user = res.data; // update tampilan
          
          this.selectedFile = null; // reset file input
          this.showToast('Profil berhasil diperbarui!');
          
          this.cdr.detectChanges(); // refresh 
        } else {
          this.showToast('Gagal update: ' + res.message);
        }
      },
      error: async (err) => {
        await loading.dismiss();
        console.error(err);
        this.showToast('Gagal koneksi server.');
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

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000 });
    toast.present();
  }
}