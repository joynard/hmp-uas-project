import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(environment.apiKey + 'categories.php');
  }

  createCategory(name: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    const body = new URLSearchParams();
    body.set('name', name);
    
    return this.http.post(environment.apiKey + 'categories.php', body.toString(), { headers });
  }
}