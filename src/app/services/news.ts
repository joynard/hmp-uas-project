import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    if (params.length > 0) url += '?' + params.join('&');
    return this.http.get(url);
  }

  getNewsByCategory(categoryId: any) {
    const time = new Date().getTime();
    return this.http.get(environment.apiKey + 'news_category.php?id=' + categoryId + '&t=' + time);
  }

  createNews(formData: FormData) {
    return this.http.post(environment.apiKey + 'news.php', formData);
  }

  getNewsDetail(id: number, isView: boolean = false) {
    return this.http.get(environment.apiKey + 'news.php?id=' + id + '&is_view=' + isView);
  }

  // 2. Ambil Komentar
  getComments(news_id: number) {
    // HAPUS huruf 's' di sini
    return this.http.get(environment.apiKey + 'comment.php?news_id=' + news_id);
  }

  // 3. Kirim Komentar (Bisa Reply jika ada parent_id)
  addComment(news_id: number, user_id: number, content: string, parent_id: number | null = null) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('news_id', news_id.toString());
    body.set('user_id', user_id.toString());
    body.set('content', content);
    if (parent_id) body.set('parent_id', parent_id.toString());

    return this.http.post(environment.apiKey + 'comment.php', body.toString(), { headers });
  }

  // 4. Kirim Rating
  addRating(news_id: number, user_id: number, score: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('news_id', news_id.toString());
    body.set('user_id', user_id.toString());
    body.set('score', score.toString());

    // Panggil actions.php dengan parameter ?action=rate
    return this.http.post(environment.apiKey + 'actions.php?action=rate', body.toString(), { headers });
  }

  // 5. Toggle Favorit (Tambah/Hapus)
  toggleFavorite(news_id: number, user_id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('news_id', news_id.toString());
    body.set('user_id', user_id.toString());

    return this.http.post(environment.apiKey + 'actions.php?action=fav', body.toString(), { headers });
  }

  // 6. Cek Status Favorit (Untuk mewarnai icon hati saat pertama buka)
  getMyFavorites(user_id: number) {
    return this.http.get(environment.apiKey + 'actions.php?action=get_fav&user_id=' + user_id);
  }

  // 7. Hapus Berita
  deleteNews(id: number) {
    return this.http.get(environment.apiKey + 'news.php?action=delete&id=' + id);
  }

  // 8. get user rating for a news item
  getMyRating(news_id: number, user_id: number) {
    return this.http.get(environment.apiKey + 'actions.php?action=get_rate&news_id=' + news_id + '&user_id=' + user_id);
  }
}