const initialState = {
  initialLocations: "",
};

export function locationStore(state = initialState, action) {
  if (action.type === "initialLocations") {
    return { ...state, initialLocations: action.payload };
  } else if (action.type === "updateState") {
    return { ...state, initialLocations: action.payload };
  }
  return state;
}
