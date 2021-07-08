import { combineReducers, createStore } from "redux";

import itemsReducer from "./itemsReducer";

let reducers = combineReducers({
  items: itemsReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
