import config from "../config";

export const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.API_TOKEN, token);
    // console.log("token", token);
    // console.log("sessionStorage", window.sessionStorage.getItem(config.API_TOKEN));
  },
  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.API_TOKEN);
    console.info("clearing auth token");
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  getAuthToken(token) {
    return window.sessionStorage.getItem(config.API_TOKEN);
  }
};
