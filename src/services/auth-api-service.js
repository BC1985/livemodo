import config from "../config";
import { TokenService } from "../utils/token-service";

const AuthApiService = {
  postRefreshToken(user) {
    return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()} `
      }
    })
      .then(res => {
        if (!res.ok) {
          res.json().then(e => Promise.reject(e));
        } else {
          res.json();
        }
      })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthApiService.postRefreshToken();
        });
        return res;
      })
      .catch(err => {
        console.log("refresh token request error");
        console.error(err);
      });
  }
};

export default AuthApiService;
