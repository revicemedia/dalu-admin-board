const initialState = {
  activeRoute: "Home",
};

export function activeRoute(state = initialState, action) {
  if (action.type === "changeActiveRoute") {
    return { ...state, activeRoute: action.payload };
  }
  return state;
}
