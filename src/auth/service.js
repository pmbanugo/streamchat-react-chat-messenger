import { config } from "./config";
import * as Auth0 from "auth0-js";

class Auth {
  auth0 = new Auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId,
    redirectUri: config.redirect,
    audience: config.audience,
    responseType: "id_token token",
    scope: "openid profile email"
  });

  authFlag = "isLoggedIn";
  userProfileFlag = "userProfile";
  authStatus = this.isAuthenticated
    ? "init_with_auth_flag"
    : "init_no_auth_flag";

  localLogin(authResult) {
    localStorage.setItem(this.authFlag, true);
    localStorage.setItem(
      this.userProfileFlag,
      JSON.stringify(authResult.idTokenPayload)
    );
    this.loginCallback(authResult.idTokenPayload);
  }

  localLogout() {
    localStorage.removeItem(this.authFlag);
    localStorage.removeItem(this.userProfileFlag);
    this.logoutCallback();
  }

  login() {
    this.auth0.popup.authorize({}, (err, authResult) => {
      if (err) this.localLogout();
      else {
        this.localLogin(authResult);
      }
    });
  }

  isAuthenticated() {
    return localStorage.getItem(this.authFlag) === "true";
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem(this.userProfileFlag));
  }

  logout() {
    this.localLogout();
    this.auth0.logout({
      returnTo: config.logoutUrl,
      clientID: config.clientId
    });
  }
}

const auth = new Auth();

export default auth;
