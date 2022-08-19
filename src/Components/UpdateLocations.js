import "../App.css";
import "../index.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import KontaktDialog from "./KontaktDialog";

function UpdatePage({ allLocations, onSearchSubmit }) {
  const [searchValue, setSearchValue] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    onSearchSubmit(e.target.value);
  };

  const openModal = (location) => {
    setActiveLocation(location);
    setDialogIsOpen(true);
  };

  const onCloseClick = () => {
    setDialogIsOpen(false);
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
              <LocationDataContent>
                <div>
                  <StyledEditHeadline>
                    {location.locationName}
                  </StyledEditHeadline>
                  <p>{location.locationCity}</p>
                </div>
                <div>
                  {location.locationIsActive === "true" ? (
                    <Chip
                      variant="outlined"
                      color="success"
                      size="small"
                      label="Aktiv"
                    />
                  ) : (
                    <Chip
                      variant="outlined"
                      color="error"
                      size="small"
                      label="Inaktiv"
                    />
                  )}
                </div>
              </LocationDataContent>
              <StyledButtonWrapper>
                <Button
                  fullWidth
                  variant="contained"
                  className="Button-additions"
                  onClick={() => openModal(location)}
                >
                  Kontakt
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  className="Button-additions-outlined"
                >
                  Bearbeiten
                </Button>
              </StyledButtonWrapper>
            </LocationCompleteWrapper>
          ))}
          <KontaktDialog
            dialogIsOpen={dialogIsOpen}
            onCloseClick={onCloseClick}
            activeLocation={activeLocation}
          />
        </ResultsWrapper>
      )}
      {console.log(allLocations)}
    </UpdateWrapper>
  );
}

const StyledEditHeadline = styled.p`
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const UpdateWrapper = styled.div`
  width: auto;
  max-width: 100%;
`;

const SearchWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 20px;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const LocationCompleteWrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  cursor: default;

  &:hover {
    box-shadow: 0 0 5px 2px #dedede;
  }
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

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 762px) {
    grid-template-columns: 1fr;
  }
`;

const LocationDataContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
`;

export default UpdatePage;
