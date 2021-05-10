import config from "../config";

const apiService = {
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
  }
};

export default apiService;
