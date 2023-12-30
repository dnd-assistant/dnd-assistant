import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, NavController } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { RouteMap } from '../../app.routes';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent],
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    if (this.authService.isLoggedIn) {
      this.navCtrl.navigateRoot(RouteMap.DashboardPage.getPath());
    }
  }
}
