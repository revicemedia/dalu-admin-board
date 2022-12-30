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

function AddLocation() {
  const [image, setImage] = useState();
  const [locationType, setLocationType] = useState("Bar");
  const [locationStatus, setLocationStatus] = useState("green");
  const [userToggle, setUserToggle] = useState(false);
  const [locationCity, setLocationCity] = useState();
  const [locationStreet, setLocationStreet] = useState();
  const [locationName, setLocationName] = useState();

  const handleUserToggle = () => {
    setUserToggle(!userToggle);
  };

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleLocationCityChange = (e) => {
    setLocationCity(e.target.value);
  };

  const handleLocationStreetChange = (e) => {
    setLocationStreet(e.target.value);
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

  return (
    <UpdateWrapper>
      <SearchWrapper onSubmit={handleLocationInsert}>
        <TextField
          id="searchLocations"
          value={locationName}
          onChange={handleLocationNameChange}
          className="InputSearchCustomization"
          variant="outlined"
          label="Name der Location"
          fullWidth
        />
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
        {locationName ? (
          <Button
            variant="contained"
            type="submit"
            className="Button-additions"
          >
            Erstellen
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            className="Button-additions-disabled"
            disabled
          >
            Erstellen
          </Button>
        )}
      </SearchWrapper>
      <SecondSearchWrapper>
        <FormControlLabel
          className="FormControl"
          control={
            <Checkbox checked={userToggle} onChange={handleUserToggle} />
          }
          label="Ansprechpartner ist bereits hinterlegt"
        />
        {/* <img src={image} alt="Test" /> */}
      </SecondSearchWrapper>
      {userToggle ? (
        <SecondSearchWrapper>Open</SecondSearchWrapper>
      ) : (
        <SecondSearchWrapper>Closed</SecondSearchWrapper>
      )}
    </UpdateWrapper>
  );
}

const UpdateWrapper = styled.div`
  position: relative;
  width: auto;
  max-width: 100%;
  padding-top: 40px;
`;

const SearchWrapper = styled.form`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const SecondSearchWrapper = styled.form`
  margin-bottom: 20px;
  width: 100%;
  background-color: #fff;
  gap: 10px;
`;

const Input = styled("input")({
  display: "none",
});

export default AddLocation;
