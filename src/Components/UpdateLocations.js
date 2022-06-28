import "../App.css";
import "../index.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

function UpdatePage({ allLocations, onSearchSubmit }) {
  const [searchValue, setSearchValue] = useState();

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    onSearchSubmit(e.target.value);
  };

  return (
    <UpdateWrapper>
      <SearchWrapper>
        <TextField
          id="searchLocations"
          value={searchValue}
          onChange={handleSearchChange}
          className="InputSearchCustomization"
          placeholder="Location, Anschrift o.ä. suchen"
          variant="outlined"
          fullWidth
        />
        {/* <Button variant="contained" type="submit" className="Button-additions">
          Suchen
        </Button> */}
      </SearchWrapper>
      {allLocations && (
        <ResultsWrapper>
          {allLocations.map((location) => (
            <LocationCompleteWrapper key={location.locationId}>
              <StyledLocationImage>
                <LocationImage
                  src={
                    "https://dalu-api-delivery-service.com/image-uploads/" +
                    location.locationId
                  }
                  alt={location.locationName + " Image"}
                />
                {location.locationIsActive === "true" ? (
                  <Chip
                    label="Active"
                    color="success"
                    className="ChipStyling ChipColor"
                  />
                ) : (
                  <Chip
                    color="error"
                    label="Inactive"
                    className="ChipStyling"
                  />
                )}
              </StyledLocationImage>
              <LocationDataContent>
                <h3>{location.locationName}</h3>
                <p>
                  <strong>Typ: </strong> {location.locationType}
                </p>
                <p>
                  <strong>Status: </strong> {location.locationStatus}
                </p>
                <br />
                <Button variant="outlined">Bearbeiten</Button>
              </LocationDataContent>
            </LocationCompleteWrapper>
          ))}
        </ResultsWrapper>
      )}
      {console.log(allLocations)}
    </UpdateWrapper>
  );
}

const UpdateWrapper = styled.div`
  position: relative;
  width: auto;
  max-width: 100%;
`;

const SearchWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const LocationCompleteWrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 10px;
`;

const ResultsWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media screen and (min-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const StyledLocationImage = styled.div`
  width: 100%;
  min-width: 100%;
  height: auto;
  object-fit: cover;
  overflow: hidden;
  border-radius: 2.5px;
  position: relative;
`;

const LocationDataContent = styled.div`
  width: 100%;
`;

const LocationImage = styled.img`
  max-height: 250px;
  /* @media screen and (max-width: 1500px) {
    max-height: 300px;
  }
  @media screen and (max-width: 1300px) {
    max-height: 250px;
  } */
  @media screen and (max-width: 1100px) {
    max-height: 200px;
  }
  @media screen and (max-width: 1000px) {
    max-height: 150px;
  }
  @media screen and (min-width: 2000px) {
    max-height: 700px;
  }
  @media screen and (min-width: 1800px) {
    max-height: 400px;
  }
`;

export default UpdatePage;
