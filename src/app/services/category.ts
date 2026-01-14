import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    const timestamp = new Date().getTime(); // untuk mencegah cache
    return this.http.get(environment.apiKey + 'categories.php?t=' + timestamp);
  }

  createCategory(name: string) {
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = 'name=' + name;
    return this.http.post(environment.apiKey + 'categories.php', body, { headers: header });
  }
}