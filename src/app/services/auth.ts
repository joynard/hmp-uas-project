import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
}