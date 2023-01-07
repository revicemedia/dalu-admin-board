import "../App.css";
import "../index.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { getAllLocations } from "../functions/getActiveLocations";
import RestaurantIcon from "../svgs/restaurant_menu_black_24dp.svg";
import CafeIcon from "../svgs/coffee_black_24dp.svg";
import BarIcon from "../svgs/local_bar_black_24dp.svg";

function Map() {
  const [center, setCenter] = useState({
    lat: 50.3463816,
    lng: 7.5185153,
  });
  const [allActiveLocations, setAllActiveLocations] = useState([]);

  console.log(setCenter);

  useEffect(() => {
    getAllLocations().then((data) => {
      setAllActiveLocations(data);
    });
  }, []);

  const markerClick = (marker) => {
    console.log(marker);
  };

  return (
    <>
      <StyledWrapper id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAoBsFNDDZL59ZGNy4UCPSjsbmEHNQhRHk" }}
          zoom={12}
          gestureHandling={"greedy"}
          center={center}
        >
          {allActiveLocations.map((marker, index) => (
            <div
              className="MarkerIdee"
              lat={marker.locationLat}
              lng={marker.locationLng}
              text={marker.locationName}
              key={index}
              onClick={() => markerClick(marker)}
            >
              <div
                className={
                  marker.locationStatus === "green"
                    ? "StatusMarker BadgeGreen"
                    : marker.locationStatus === "yellow"
                    ? "StatusMarker BadgeYellow"
                    : marker.locationStatus === "red"
                    ? "StatusMarker BadgeRed"
                    : ""
                }
              ></div>
              <img
                src={
                  marker.locationType === "restaurant"
                    ? RestaurantIcon
                    : marker.locationType === "cafe"
                    ? CafeIcon
                    : marker.locationType === "bar"
                    ? BarIcon
                    : ""
                }
                alt="Location type icon"
              />
            </div>
          ))}
        </GoogleMapReact>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  width: 100% !important;
  height: calc(100vh - 108px) !important;

  @media screen and (max-width: 640px) {
    height: calc(100vh - 74px) !important;
  }
`;

export default Map;
