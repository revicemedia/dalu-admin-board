import { createStore, combineReducers } from "redux";
import { centerStore } from "./zoom";
import { numberStore } from "./numbers";
import { locationStore } from "./locations";
import { exactlocation } from "./exactlocation";
import { activeRoute } from "./ACTIVEROUTE";

export default createStore(
  combineReducers({
    Locations: locationStore,
    exactlocation: exactlocation,
    center: centerStore,
    number: numberStore,
    ACTIVEROUTE: activeRoute,
  })
);
