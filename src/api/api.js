import axios from "axios";

const instance = axios.create({
  withCredentials: false,
  baseURL: "https://api.punkapi.com/v2/beers",
});

const itemAPI = {
  getItem(params) {
    return instance.get(`/1`).then((res) => res);
  },
  getAllItems(params) {
    return instance.get(`?page=1&per_page=10`);
  },
  // getAllBeers(params, callback) {
  //   return instance.get(`?page=1&per_page=10`).then((res) => {
  //     callback(res.data);
  //   });
  // },
};

export default itemAPI;
