import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  themeColor = new BehaviorSubject<string>('blue');
  public justLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.loadTheme();
   }

  register(fullname: string, email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    const body = new URLSearchParams();
    body.set('fullname', fullname);
    body.set('email', email);
    body.set('password', password);
    
    const urlEncodedData = body.toString();

    return this.http.post(environment.apiKey + 'register.php', urlEncodedData, { headers });
  }

  login(email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    
    const urlEncodedData = body.toString();

    return this.http.post(environment.apiKey + 'login.php', urlEncodedData, { headers });
  }

  saveSession(user: any) {
    localStorage.setItem('hmp_user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('hmp_user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('hmp_user');
  }

  isLoggedIn() {
    return localStorage.getItem('hmp_user') !== null;
  }

  // 1. FUNGSI UPDATE PROFIL + FOTO
  updateProfile(userId: number, fullname: string, avatarFile: File | null) {
    alert ('4a');
    const formData = new FormData();
    formData.append('user_id', userId.toString());
    formData.append('fullname', fullname);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    alert('4b')
    return this.http.post(environment.apiKey + 'profile.php', formData);
  }

  // 2. FUNGSI TEMA (LocalStorage)
  setTheme(colorName: string) {
    localStorage.setItem('theme_color', colorName);
    this.themeColor.next(colorName); // Beritahu seluruh aplikasi warna berubah
    
    // Update CSS Variable secara global
    document.body.setAttribute('color-theme', colorName);
  }

  loadTheme() {
    const savedColor = localStorage.getItem('theme_color') || 'blue';
    this.setTheme(savedColor);
  }

  // 3. FUNGSI DARK MODE
  toggleDarkMode(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('dark_mode', isDark ? 'true' : 'false');
  }

  isDarkMode() {
    return localStorage.getItem('dark_mode') === 'true';
  }
  
}