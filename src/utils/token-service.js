import config from "../config";

export const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.API_TOKEN, token);
  },

  getAuthToken(token) {
    window.localStorage.getItem(config.API_TOKEN);
  }
};
