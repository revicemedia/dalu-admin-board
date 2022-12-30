import "../App.css";
import "../index.css";
import { useState } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

function Map() {
  const [center, setCenter] = useState({
    lat: 50.3463816,
    lng: 7.5185153,
  });

  return (
    <>
      <StyledWrapper id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAoBsFNDDZL59ZGNy4UCPSjsbmEHNQhRHk" }}
          zoom={12}
          gestureHandling={"greedy"}
          center={center}
        >
          {/* {markers.map((marker, index) => (
            <div
              className="MarkerIdee"
              lat={marker.locationLat}
              lng={marker.locationLng}
              text={marker.locationName}
              key={index}
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
          {loc ? (
            <div
              className="GeoMarker"
              lat={loc.coords.latitude}
              lng={loc.coords.longitude}
            ></div>
          ) : (
            ""
          )} */}
        </GoogleMapReact>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Map;
