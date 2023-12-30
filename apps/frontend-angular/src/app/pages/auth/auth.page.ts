import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NavController,
  ToastController,
} from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { validateEmail, validatePassword } from '@dnd-assistant/shared-utils';
import { TRPCService } from "../../services/trpc.service";
import { RouteMap } from "../../app.routes";
import { AuthService } from "../../services/auth.service";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonText, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: "page-auth",
  templateUrl: "auth.page.html",
  styleUrls: ["auth.page.scss"],
  standalone: true,
  imports: [IonCardContent, IonCardHeader, IonCard, IonContent, IonTitle, IonButtons, IonMenuButton, IonIcon, IonToolbar, IonHeader, IonItem, IonInput, IonButton, FormsModule, CommonModule, IonCardTitle, IonCardSubtitle, IonText]
})
export class AuthPage implements AfterViewInit {
  @ViewChild("googleSignIn", { static: true }) googleSignIn!: ElementRef<HTMLDivElement>;

  showLogin = false;

  name = "";
  email = "";
  password = "";
  confirmPassword = "";

  constructor(
    private navCtrl: NavController,
    private trpcService: TRPCService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    if (this.route.snapshot.paramMap.get("authType") === "register") {
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
  }

  ngAfterViewInit() {
    this.initGoogleGSI();
  }

  ionViewWillEnter() {
    this.renderButton();
  }

  initGoogleGSI() {
    const googleScriptNodeId = 'google-auth-script';
    const existingNode = document.getElementById(googleScriptNodeId);
    if (!existingNode) {
      const googleScriptNode = document.createElement('script');
      googleScriptNode.src = 'https://accounts.google.com/gsi/client';
      googleScriptNode.async = true;
      googleScriptNode.id = googleScriptNodeId;
      googleScriptNode.addEventListener('load', () => this.renderButton());
      document.head.appendChild(googleScriptNode);
    }
  }

  renderButton() {
    (window as any).google?.accounts.id.initialize({
      client_id:
        '855994409293-i9rrk07efudt7djsekpjjvah0iub2gr1.apps.googleusercontent.com',
      context: 'signin',
      ux_mode: 'popup',
      login_uri:
        'https://80--main--dnd-assistant--cmeyer.coder.tartarus.cloud/api/login/google',
      callback: () => this.loginWithGoogle,
      auto_prompt: 'false',
    });

    (window as any).google?.accounts.id.renderButton(this.googleSignIn.nativeElement, {
      type: 'standard',
      shape: 'rectangular',
      theme: 'filled_black',
      text: 'continue_with',
      size: 'large',
      logo_alignment: 'left',
    });
  }

  async toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  async presentToast(message: string) {
    (
      await this.toastCtrl.create({
        message,
        duration: 6000,
      })
    ).present();
  }

  async loginWithGoogle(args: any) {
    await this.trpcService.handle(this.trpcService.trpc.user.signInWithGoogle.mutate(args));
  }

  async login() {
    const session = await this.trpcService.handle(this.trpcService.trpc.user.login.mutate(
      {
        email: this.email,
        password: this.password,
      },
    ), {
      400: () => this.presentToast("Username or password incorrect")
    });

    if (!session) return;

    this.authService.setToken(session);

    this.navCtrl.navigateRoot(RouteMap.DashboardPage.getPath());
  }

  async register() {
    const session = await this.trpcService.handle(this.trpcService.trpc.user.register.mutate(
      {
        email: this.email,
        password: this.password,
      },
    ),
    {
      406: () => this.presentToast("An account with that email address already exists"),
    });

    if (!session) return;

    this.authService.setToken(session);

    this.navCtrl.navigateRoot(RouteMap.DashboardPage.getPath());
  }

  isEmailValid() {
    return validateEmail(this.email);
  }

  isPasswordValid() {
    return validatePassword(this.password);
  }

  isConfirmPasswordValid() {
    return this.password === this.confirmPassword;
  }
}
