let SET_BERS = "SET_BERS";
let SET_ONE_BEER = "SET_ONE_BEER";

let initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BERS: {
      return {
        ...state,
        ...action.items,
      };
    }
    case SET_ONE_BEER: {
      return {
        item: action.oneItem,
      };
    }
    default: {
      return state;
    }
  }
};

export let setBeersAC = (params) => {
  return {
    type: SET_BERS,
    items: params,
  };
};
export let setOneBeerAC = (params) => {
  return {
    type: SET_ONE_BEER,
    oneItem: params,
  };
};

export default itemsReducer;
