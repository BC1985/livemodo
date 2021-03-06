import config from "../config";

export const apiService = {
  postUser: async (user)=> {
      const res  = await fetch(`${config.API_BASE_URL}/users/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data
  },
  logIn: async (credentials)=> {
      const res  = await fetch(`${config.API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    return data
  },
  postReview: async (review)=> {
    const token = localStorage.getItem("jwt token");    
    console.log('token', token)
    const res  = await fetch(`${config.API_BASE_URL}/reviews/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`
      },
      body: JSON.stringify(review),
    });
    const data = await res.json();
    console.log(review)
    return data
  },

};

