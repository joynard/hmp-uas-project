import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(category_id?: number, search?: string) {
    let url = environment.apiKey + 'news.php';
    
    const params = [];
    if (category_id) params.push(`category_id=${category_id}`);
    if (search) params.push(`search=${search}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get(url);
  }
}