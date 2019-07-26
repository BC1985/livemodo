import config from "../config";

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => {
      if (!res.ok) {
        res.json().then(e => Promise.reject(e));
      } else {
        res.json();
      }
    });
  }
};

export default AuthApiService;
