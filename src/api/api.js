import { setItemsAC } from "../redux/itemsReducer";

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
    return instance.get(`?page=1&per_page=10`).then((res) => {
      console.log(res);
      return res.data;
    });
  },
};

export default itemAPI;
