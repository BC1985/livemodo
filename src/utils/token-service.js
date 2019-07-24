import config from "../config";

export const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.API_TOKEN, token);
    // console.log("token", token);
    // console.log("localStorage", window.localStorage.getItem(config.API_TOKEN));
  },
  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.API_TOKEN);
    console.info("clearing auth token");
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  getAuthToken(token) {
    return window.localStorage.getItem(config.API_TOKEN);
  }
};
