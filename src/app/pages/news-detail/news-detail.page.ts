import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewsDetailPage implements OnInit {

  newsId: number = 0;
  news: any = {};
  images: string[] = [];
  comments: any[] = [];
  
  // State User
  user: any = {};
  isFavorite: boolean = false;
  
  // State Input
  newComment: string = '';
  replyTo: any = null; // Menyimpan objek komentar yang sedang dibalas
  userRating: number = 0;

  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    // Ambil ID dari URL
    this.newsId = Number(this.route.snapshot.paramMap.get('id'));
    
    if(this.newsId) {
      this.loadNewsDetail();
      this.loadComments();
      this.checkFavoriteStatus();
    }
  }

  loadNewsDetail() {
    this.newsService.getNewsDetail(this.newsId).subscribe((res: any) => {
      if(res.result === 'success') {
        this.news = res.news;
        this.images = res.images; // Array foto detail
        // Set rating user jika sudah pernah rate (ini bisa dikembangkan, sementara 0)
      }
    });
  }

  loadComments() {
    this.newsService.getComments(this.newsId).subscribe((res: any) => {
      // Kita perlu menyusun komentar menjadi Parent -> Children
      // Filter komentar induk (parent_id null)
      const parents = res.filter((c: any) => !c.parent_id);
      
      // Masukkan children ke dalam parent masing-masing
      parents.forEach((p: any) => {
        p.replies = res.filter((c: any) => c.parent_id == p.id);
      });

      this.comments = parents;
    });
  }

  checkFavoriteStatus() {
    this.newsService.getMyFavorites(this.user.id).subscribe((res: any) => {
      // Cek apakah berita ini ada di daftar favorit user
      const found = res.find((f: any) => f.id == this.newsId);
      this.isFavorite = !!found; // true jika found, false jika undefined
    });
  }

  // --- ACTIONS ---

  async toggleFavorite() {
    this.newsService.toggleFavorite(this.newsId, this.user.id).subscribe((res: any) => {
      if(res.result === 'success') {
        this.isFavorite = (res.status === 'added');
        this.showToast(this.isFavorite ? 'Ditambahkan ke Favorit' : 'Dihapus dari Favorit');
      }
    });
  }

  async sendComment() {
    if(!this.newComment) return;

    const parentId = this.replyTo ? this.replyTo.id : null;

    this.newsService.addComment(this.newsId, this.user.id, this.newComment, parentId)
      .subscribe((res: any) => {
        if(res.result === 'success') {
          this.newComment = '';
          this.replyTo = null; // Reset mode reply
          this.loadComments(); // Refresh komentar
          this.showToast('Komentar terkirim');
        }
      });
  }

  // Set mode reply
  setReply(comment: any) {
    this.replyTo = comment;
    // Otomatis scroll ke input box (opsional)
  }

  // Batal reply
  cancelReply() {
    this.replyTo = null;
  }

  // Beri Rating (Klik Bintang)
  rate(score: number) {
    this.userRating = score;
    this.newsService.addRating(this.newsId, this.user.id, score).subscribe(() => {
      this.showToast(`Anda memberi rating ${score}/5`);
      this.loadNewsDetail(); // Refresh rata-rata rating
    });
  }

  // Hapus Berita (Hanya Pembuat)
  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Berita?',
      message: 'Berita yang dihapus tidak bisa dikembalikan.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { 
          text: 'Hapus', 
          role: 'destructive',
          handler: () => {
            this.newsService.deleteNews(this.newsId).subscribe((res: any) => {
              if(res.result === 'success') {
                this.showToast('Berita berhasil dihapus');
                this.navCtrl.back();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000 });
    toast.present();
  }
}