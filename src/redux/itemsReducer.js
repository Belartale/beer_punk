let LOOK = "LOOK";

let initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOOK: {
      return {
        ...state,
        beers: action.items,
      };
    }
    default: {
      return state;
    }
  }
};

export let setItemsAC = (items) => ({
  type: LOOK,
  items: items,
});

export default itemsReducer;
