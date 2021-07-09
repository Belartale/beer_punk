import axios from "axios";

const instance = axios.create({
  withCredentials: false,
  baseURL: "https://api.punkapi.com/v2/beers",
});

const itemAPI = {
  getBeer(params) {
    return instance.get(`/${params}`);
  },
  getAllBeers(params) {
    return instance.get(`?page=1&per_page=80`);
  },
  getBeersWithWho(params) {
    return instance.get(`?food=${params}&per_page=80`);
  },

  // getAllBeers(params, callback) {
  //   return instance.get(`?page=1&per_page=10`).then((res) => {
  //     callback(res.data);
  //   });
  // },
};

export default itemAPI;
