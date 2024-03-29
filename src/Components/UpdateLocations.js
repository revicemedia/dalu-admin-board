import "../App.css";
import "../index.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import KontaktDialog from "./KontaktDialog";
import StyledNav from "./StyledNav";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import GreenIcon from "../svgs/Icons/check.svg";
import RedIcon from "../svgs/Icons/cancel.svg";
import YellowIcon from "../svgs/Icons/error.svg";

function UpdatePage({ allLocations, activeUser, onLogoutClick }) {
  const [searchValue, setSearchValue] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [searchFilter, setSearchFilter] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [updateComponent, setUpdateComponent] = useState(false);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    onSearchSubmit(e.target.value);
  };

  useEffect(() => {
    if (searchFilter) {
      setLocations(filteredLocations);
    } else {
      setLocations(allLocations);
    }
  }, [allLocations, filteredLocations, searchFilter]);

  function onSearchSubmit(finalSearch) {
    setSearchFilter(true);
    if (finalSearch !== "") {
      setFilteredLocations(
        allLocations.filter(
          (loc) =>
            loc.locationName
              .toLowerCase()
              .includes(finalSearch.toLowerCase()) ||
            loc.locationCity
              .toLowerCase()
              .includes(finalSearch.toLowerCase()) ||
            loc.locationPostal
              .toLowerCase()
              .includes(finalSearch.toLowerCase()) ||
            loc.locationInfoText
              .toLowerCase()
              .includes(finalSearch.toLowerCase()) ||
            loc.userMail.toLowerCase().includes(finalSearch.toLowerCase()) ||
            loc.locationType.toLowerCase().includes(finalSearch.toLowerCase())
        )
      );
      if (filteredLocations.length === 1) {
        setSearchFilter(true);
      }
    } else {
      setSearchFilter(false);
      setFilteredLocations([]);
    }
  }

  const openModal = (location) => {
    setActiveLocation(location);
    setDialogIsOpen(true);
  };

  const onCloseClick = () => {
    setDialogIsOpen(false);
  };

  // const updateLocationStatus = (locationStatus, locationId, activeUser) => {
  //   fetch(
  //     "https://dalu-api-delivery-service.com/updateUserLocation.php?um=" +
  //       activeUser.userMail +
  //       "&ut=" +
  //       activeUser.userAuthToken +
  //       "&locationId=" +
  //       locationId +
  //       "&locationStatus=" +
  //       locationStatus
  //   ).then((response) =>
  //     response.json().catch((error) => console.log(error.message))
  //   );
  // };

  async function updateLocationStatus(locationStatus, locationId, activeUser) {
    let response = await fetch(
      "https://dalu-api-delivery-service.com/updateUserLocation.php?um=" +
        activeUser.userMail +
        "&ut=" +
        activeUser.userAuthToken +
        "&locationId=" +
        locationId +
        "&locationStatus=" +
        locationStatus
    );
    let data = await response.json();
    if (data) {
      setUpdateComponent(true);
    } else {
      setUpdateComponent(false);
    }
  }

  useEffect(() => {
    if (updateComponent) {
      window.location.reload();
    }
  }, [updateComponent]);

  return (
    <>
      <StyledNav activeUser={activeUser} onLogoutClick={onLogoutClick} />
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
        </SearchWrapper>
        {locations ? (
          <ResultsWrapper>
            {locations.map((location) => (
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
                  {activeUser.userIsManager === "false" ? (
                    <Button
                      fullWidth
                      variant="contained"
                      className="Button-additions"
                      onClick={() => openModal(location)}
                    >
                      Kontakt
                    </Button>
                  ) : (
                    <StyledStatusButtonWrapper>
                      <Button
                        // className="StatusButtonUpdate StatusButtonUpdate-green"
                        className={
                          location.locationStatus === "green"
                            ? "StatusButtonUpdate"
                            : "StatusButtonUpdate StatusButtonUpdate-green"
                        }
                        variant="contained"
                        disabled={
                          location.locationStatus === "green" ? true : false
                        }
                        onClick={() =>
                          updateLocationStatus(
                            "green",
                            location.locationId,
                            activeUser
                          )
                        }
                      >
                        <img
                          className="IconButtonStatus"
                          src={GreenIcon}
                          alt="Icon"
                        />
                      </Button>
                      <Button
                        className={
                          location.locationStatus === "yellow"
                            ? "StatusButtonUpdate"
                            : "StatusButtonUpdate StatusButtonUpdate-yellow"
                        }
                        variant="contained"
                        disabled={
                          location.locationStatus === "yellow" ? true : false
                        }
                        onClick={() =>
                          updateLocationStatus(
                            "yellow",
                            location.locationId,
                            activeUser
                          )
                        }
                      >
                        <img
                          className="IconButtonStatus"
                          src={YellowIcon}
                          alt="Icon"
                        />
                      </Button>
                      <Button
                        className={
                          location.locationStatus === "red"
                            ? "StatusButtonUpdate"
                            : "StatusButtonUpdate StatusButtonUpdate-red"
                        }
                        variant="contained"
                        disabled={
                          location.locationStatus === "red" ? true : false
                        }
                        onClick={() =>
                          updateLocationStatus(
                            "red",
                            location.locationId,
                            activeUser
                          )
                        }
                      >
                        <img
                          className="IconButtonStatus"
                          src={RedIcon}
                          alt="Icon"
                        />
                      </Button>
                    </StyledStatusButtonWrapper>
                  )}
                  <Link
                    to={"/bearbeiten/location/" + location.locationId}
                    className="Button-additions-outlined"
                  >
                    Bearbeiten
                  </Link>
                </StyledButtonWrapper>
              </LocationCompleteWrapper>
            ))}
            <KontaktDialog
              dialogIsOpen={dialogIsOpen}
              onCloseClick={onCloseClick}
              activeLocation={activeLocation}
            />
          </ResultsWrapper>
        ) : (
          <LoaderWrapper>
            <CircularProgress />
          </LoaderWrapper>
        )}
      </UpdateWrapper>
    </>
  );
}

const StyledEditHeadline = styled.p`
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const StyledStatusButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 138px;

  @media screen and (max-width: 1140px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media screen and (max-width: 640px) {
    padding-top: 104px;
  }
`;

const SearchWrapper = styled.div`
  width: 100%;
  background-color: #f3f2f2;
  padding: 20px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px 0;
`;

const LocationCompleteWrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  cursor: default;
  border: 1px dashed #dedede;

  &:hover {
    box-shadow: 0 0 5px 2px #dedede;
    border: 1px dashed #fff;
  }
`;

const ResultsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding-bottom: 60px;

  @media screen and (min-width: 1600px) {
    grid-template-columns: 1fr 1fr 1fr;
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
  gap: 20px;
`;

export default UpdatePage;
