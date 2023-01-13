import "../App.css";
import "../index.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { locationTypes } from "../helper/location-list";
import { initialStati } from "../helper/initialStatus-list";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import UploadIcon from "@mui/icons-material/Upload";
import MenuItem from "@mui/material/MenuItem";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getAllUserMails } from "../functions/getAllUserMails";

function AddLocation({ activeUser }) {
  const [image, setImage] = useState();
  const [locationType, setLocationType] = useState("Bar");
  const [locationStatus, setLocationStatus] = useState("green");
  const [userToggle, setUserToggle] = useState(false);
  const [allUserMails, setAllUserMails] = useState(null);
  const [locationOwnerMail, setLocationOwnerMail] = useState(undefined);
  // const [locationCity, setLocationCity] = useState();
  // const [locationStreet, setLocationStreet] = useState();
  const [locationName, setLocationName] = useState("");

  const handleUserToggle = () => {
    setUserToggle(!userToggle);
  };

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  // const handleLocationCityChange = (e) => {
  //   setLocationCity(e.target.value);
  // };

  // const handleLocationStreetChange = (e) => {
  //   setLocationStreet(e.target.value);
  // };

  const handleSelectedUserChange = (e) => {
    setLocationOwnerMail(e.target.value);
  };

  const handleUpload = (event) => {
    // setImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.value);
  };

  const handleLocationStatusChange = (e) => {
    setLocationStatus(e.target.value);
  };

  const handleLocationInsert = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getAllUserMails(activeUser).then((data) => {
      setAllUserMails(data);
    });
  }, [activeUser]);

  const clearForm = () => {
    setLocationOwnerMail(undefined);
    setLocationName("");
    setLocationStatus("green");
    setLocationType("Bar");
  };

  return (
    <UpdateWrapper>
      <SearchWrapper onSubmit={handleLocationInsert}>
        <InnerWrapper>
          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Name der Location"
            fullWidth
          />

          {/* Neue Inputs */}

          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Postleitzahl"
            fullWidth
          />

          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Straße & Hausnr."
            fullWidth
          />

          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Ort"
            fullWidth
          />

          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Stadt"
            fullWidth
          />

          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Latitude"
            fullWidth
          />

          <TextField
            id="searchLocations"
            value={locationName}
            onChange={handleLocationNameChange}
            className="InputSearchCustomization"
            variant="outlined"
            label="Longitude"
            fullWidth
          />

          {/* Ende neue Inputs */}
          <TextField
            id="select-locationType"
            select
            label="Art der Location"
            name="locationType"
            value={locationType}
            onChange={handleLocationTypeChange}
          >
            {locationTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="select-locationStatus"
            select
            label="Status der Location"
            name="locationStatus"
            value={locationStatus}
            onChange={handleLocationStatusChange}
          >
            {initialStati.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </InnerWrapper>
      </SearchWrapper>
      <InnerWrapperTwo>
        <FormControlLabel
          className="FormControl"
          control={
            <Checkbox checked={userToggle} onChange={handleUserToggle} />
          }
          label="Ansprechpartner bereits im System erfasst"
        />
      </InnerWrapperTwo>
      {userToggle ? (
        <InnerWrapperTwo>
          <TextField
            id="select-locationOwner"
            select
            label="Inhaber auswählen"
            name="Nutzer auswählen"
            value={locationOwnerMail !== undefined ? locationOwnerMail : ""}
            placeholder="Bitte auswählen"
            onChange={handleSelectedUserChange}
            fullWidth
          >
            {allUserMails.map((user, index) => (
              <MenuItem key={index} value={user.userMail}>
                {user.userMail}
              </MenuItem>
            ))}
          </TextField>
        </InnerWrapperTwo>
      ) : (
        <InnerWrapperTwo>Ansprechpartner anlegen</InnerWrapperTwo>
      )}
      <InnerWrapper>
        <label htmlFor="uploadbutton">
          <Input
            accept="image/*"
            id="uploadbutton"
            type="file"
            onChange={(event) => {
              handleUpload(event);
            }}
          />
          <Button
            className="UploadButton"
            variant="contained"
            component="span"
            fullWidth
          >
            {image ? <InsertPhotoOutlinedIcon /> : <UploadIcon />}
            {image ? image.name : "Hochladen"}
          </Button>
        </label>
        <Button
          type="reset"
          variant="outlined"
          className="Button-additions-outlined"
          onClick={clearForm}
        >
          Löschen
        </Button>
        {locationName ? (
          <Button
            variant="contained"
            type="submit"
            className="Button-additions"
            fullWidth
          >
            Erstellen
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            className="Button-additions-disabled"
            disabled
            fullWidth
          >
            Erstellen
          </Button>
        )}
      </InnerWrapper>
    </UpdateWrapper>
  );
}

const UpdateWrapper = styled.div`
  position: relative;
  width: auto;
  max-width: 100%;

  @media screen and (max-width: 1140px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const SearchWrapper = styled.form`
  background-color: #fff;
`;

const InnerWrapper = styled.div`
  background-color: #f3f2f2;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 10px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InnerWrapperTwo = styled.div`
  background-color: #f3f2f2;
  width: 100%;
  gap: 10px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const Input = styled("input")({
  display: "none",
});

export default AddLocation;
