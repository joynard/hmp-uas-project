import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular'; 

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
  IonRefresherContent,
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
    IonRefresherContent,
    IonToast 
  ]
})
export class ProfilePage implements OnInit {

  user: any = {};
  editName: string = '';
  selectedFile: File | null = null;
  imgUrl = environment.apiKey + 'uploads/';

  // theme state
  isDark: boolean = false;
  currentTheme: string = 'blue';

  public refreshIcon = chevronDownCircleOutline;

  isToastOpen = false;
  toastMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
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

  ionViewWillEnter() {
    this.loadUserData(); // refresh data
  }

  loadUserData() {
    this.user = this.authService.getUser();
    
    if(this.user) {
      this.editName = this.user.fullname;
    } else {
      this.router.navigateByUrl('/login'); // else user kosong suru balik ke login
    }
    
    // refresh
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

  async saveProfile() {
    if (!this.editName) {
      this.showToast('Nama tidak boleh kosong!');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Menyimpan...' });
    await loading.present();

    this.authService.updateProfile(this.user.id, this.editName, this.selectedFile).subscribe({
      next: async (res: any) => {
        await loading.dismiss(); 
        
        if(res.result === 'success') {
          this.authService.saveSession(res.data);
          this.user = res.data; 
          
          this.selectedFile = null; 
          this.showToast('Profil berhasil diperbarui!');
          
          this.cdr.detectChanges(); 
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

  showToast(msg: string) {
    this.toastMessage = msg;
    this.isToastOpen = true;
    this.cdr.detectChanges(); // show pop up
  }
}