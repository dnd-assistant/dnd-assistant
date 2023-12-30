import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonCard } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { RouteMap } from './app.routes';

interface NavListItem {
  id: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonCard],
})
export class AppComponent {
  navList: NavListItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.router.events.subscribe(() => {
      this.generateNavList();
    });
  }

  generateNavList() {
    const loggedOutItems: NavListItem[] = [{
      id: 'home',
      title: 'Home',
      url: RouteMap.HomePage.getPath(),
    }, {
      id: 'login',
      title: 'Login',
      url: RouteMap.AuthPage.getPath('login'),
    }, {
      id: 'register',
      title: 'Register',
      url: RouteMap.AuthPage.getPath('register'),
    }];

    const loggedInItems: NavListItem[] = [{
      id: 'dashboard',
      title: 'Dashboard',
      url: RouteMap.DashboardPage.getPath(),
    }];

    if (this.authService.isLoggedIn) {
      this.navList = loggedInItems;
    } else {
      this.navList = loggedOutItems;
    }
  }
}
