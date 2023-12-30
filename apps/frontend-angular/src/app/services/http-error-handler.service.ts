import { Injectable } from "@angular/core";
import { ToastController, ModalController } from "@ionic/angular/standalone";
import type { AppRouter } from "@dnd-assistant/trpc";
import { TRPCClientError } from "@trpc/client";
import { AxiosError } from "axios";

import { AuthPage } from "../pages/auth/auth.page";

export interface ErrorHandlers {
  [code: string]: () => any;
}

@Injectable({
  providedIn: "root",
})
export class HttpErrorHandlerService {
  isAuthOpen: boolean = false; // Track auth modal so we don't open multiple stacks
  defaultErrorHandlers = {
    0: () => this.presentToast("It looks like there's an issue with your connection to the internet"),
    401: () => this.promptForAuth(),
    500: () => this.presentToast("An unexpected error occurred. If this error continues, please contact us."),
  };

  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) {}

  async promptForAuth() {
    if (this.isAuthOpen) return;
    this.isAuthOpen = true;

    const modal = await this.modalCtrl.create({
      component: AuthPage,
      backdropDismiss: false,
    });

    await modal.present();

    await modal.onDidDismiss();

    this.isAuthOpen = false;

    window.location.reload();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
    });

    toast.present();
  }

  _handleError(statusCode: number, errorHandlers?: ErrorHandlers) {
    // Use provided error handlers first
    if (errorHandlers?.[statusCode]) {
      errorHandlers[statusCode]();
      // Use provided catchall if passed
    } else if (errorHandlers?.["*"]) {
      errorHandlers["*"]();
      // Fallback to default
    } else if (
      this.defaultErrorHandlers[
        statusCode as keyof typeof this.defaultErrorHandlers
      ]
    ) {
      this.defaultErrorHandlers[
        statusCode as keyof typeof this.defaultErrorHandlers
      ]();
      // All other errors use 500 by default for generic (unexpected) error
    } else {
      this.defaultErrorHandlers[500]();
    }
  }

  handleError(error: unknown, errorHandlers?: ErrorHandlers) {
    // Rethrow all non-http errors
    if (!(error instanceof Error) || !("response" in error)) {
      throw error;
    }

    // Error has been confirmed to have response property, treat as AxiosError
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response!.status;

    this._handleError(statusCode, errorHandlers);
  }

  handleTrpcError(
    error: TRPCClientError<AppRouter>,
    errorHandlers?: ErrorHandlers,
  ) {
    const statusCode = error.data?.httpStatus || 500;

    // If it was code-based or API-based, we want to know about unexpected errors
    if (statusCode >= 500) {
      console.error(error);
      // TODO: send to sentry
    }

    this._handleError(statusCode, errorHandlers);
  }
}
