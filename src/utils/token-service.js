import config from "../config";
import jwtDecode from "jwt-decode";

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

export const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.API_TOKEN, token);
    // console.log("token", token);
    // console.log("localStorage", window.localStorage.getItem(config.API_TOKEN));
  },
  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  },
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  _getMsUntilExpiry(payload) {
    /*
      payload is from the JWT
      the `exp` value is in seconds, need to convert to ms, so * 1000
      calculates the difference between now and when the JWT will expire
    */
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    /* get the number of ms from now until the token expires */
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
    );

    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
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
