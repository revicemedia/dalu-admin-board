const initialState = {
  exactlocation: {},
};

export function exactlocation(state = initialState, action) {
  if (action.type === "setCurrentPosition") {
    return { ...state, exactlocation: action.payload };
  }
  return state;
}
