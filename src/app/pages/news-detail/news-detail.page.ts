import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news';
import { AuthService } from 'src/app/services/auth';
import { environment } from 'src/environments/environment';

// --- IMPORT STANDALONE KOMPONEN ---
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonBackButton, // Tombol Kembali di Header
  IonButton, 
  IonIcon, 
  IonFooter,     // Footer Input Komen
  IonInput,      // Input Komen
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  send, 
  trashOutline, 
  eyeOutline, 
  star, 
  starOutline, 
  heart, 
  heartOutline, 
  closeCircle,
  paperPlaneOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
  standalone: true,
  // --- MASUKKAN DAFTAR KOMPONEN DI SINI ---
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons, 
    IonBackButton, 
    IonButton, 
    IonIcon,
    IonFooter, 
    IonInput,
  ]
})

export class NewsDetailPage implements OnInit {

  newsId: number = 0;
  news: any = {};
  images: string[] = [];
  comments: any[] = [];
  
  user: any = {};
  isFavorite: boolean = false;
  
  newComment: string = '';
  replyTo: any = null; 
  userRating: number = 0;

  imgUrl = environment.apiKey + 'uploads/';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    addIcons({ 
      send, 
      trashOutline, 
      eyeOutline, 
      star, 
      starOutline, 
      heart, 
      heartOutline, 
      closeCircle,
      paperPlaneOutline,
      personCircleOutline
    });
  }

  @ViewChild('scroller') scroller!: ElementRef;

    scrollLeft() {
      this.scroller.nativeElement.scrollLeft -= 200;
    }

    scrollRight() {
      this.scroller.nativeElement.scrollLeft += 200;
    }


  ngOnInit() {
    this.user = this.authService.getUser();
    this.newsId = Number(this.route.snapshot.paramMap.get('id'));
    
    if(this.newsId) {
      this.loadNewsDetail(true);
      this.loadComments();
      this.checkFavoriteStatus();
      this.checkMyRating();
    }
  }

  loadNewsDetail(isView: boolean = false) {
    this.newsService.getNewsDetail(this.newsId, isView).subscribe((res: any) => {
      if(res.result === 'success') {
        this.news = res.news;
        this.images = res.images;
      }
    });
  }

  loadComments() {
    this.newsService.getComments(this.newsId).subscribe((res: any) => {
      const parents = res.filter((c: any) => !c.parent_id);
      
      parents.forEach((p: any) => {
        p.replies = res.filter((c: any) => c.parent_id == p.id);
      });

      this.comments = parents;
    });
  }

  checkMyRating() {
    this.newsService.getMyRating(this.newsId, this.user.id).subscribe((res: any) => {
      if (res.result === 'success') {
        this.userRating = parseInt(res.score);
      } else {
        this.userRating = 0;
      }
    });
  }

  checkFavoriteStatus() {
    this.newsService.getMyFavorites(this.user.id).subscribe((res: any) => {
      const found = res.find((f: any) => f.id == this.newsId);
      this.isFavorite = !!found; 
    });
  }

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
          this.replyTo = null; 
          this.loadComments(); 
          this.showToast('Komentar terkirim');
        }
      });
  }

  setReply(comment: any) {
    this.replyTo = comment;
  }

  cancelReply() {
    this.replyTo = null;
  }

  rate(score: number) {
    this.userRating = score;
    this.newsService.addRating(this.newsId, this.user.id, score).subscribe(() => {
      this.showToast(`Anda memberi rating ${score}/5`);
      this.loadNewsDetail(false); 
    });
  }

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