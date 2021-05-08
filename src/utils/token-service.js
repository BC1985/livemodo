import config from "../config";

export const TokenService = {
  
  makeBasicAuthToken(email, password) {
    return window.btoa(`${email}:${password}`);
  },
  clearAuthToken() {
    return window.localStorage.clear();   
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  getAuthToken() {
    return window.localStorage.getItem("jwt token");
  }
};
