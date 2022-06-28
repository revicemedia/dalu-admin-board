const initialState = {
  centerStore: { lat: 50.362, lng: 7.603 },
};

export function centerStore(state = initialState, action) {
  if (action.type === "changeCenter") {
    return { ...state, centerStore: action.payload };
  }
  return state;
}
