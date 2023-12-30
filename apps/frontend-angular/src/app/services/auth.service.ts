import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn: boolean = !!localStorage.getItem("token");
  token?: string = localStorage.getItem("token") || undefined;

  constructor() {}

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.token = token;
    this.isLoggedIn = !!this.token;
  }

  removeToken() {
    localStorage.removeItem("token");
    this.token = undefined;
    this.isLoggedIn = false;
  }
}
