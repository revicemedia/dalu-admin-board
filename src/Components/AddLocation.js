import "../App.css";
import "../index.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { locationTypes } from "../helper/location-list";
import { initialStati } from "../helper/initialStatus-list";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import UploadIcon from "@mui/icons-material/Upload";
import MenuItem from "@mui/material/MenuItem";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

function AddLocation() {
  const [image, setImage] = useState();
  const [locationCity, setLocationCity] = useState();
  const [locationName, setLocationName] = useState();
  const [locationType, setLocationType] = useState("Bar");
  const [locationStatus, setLocationStatus] = useState("green");

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleLocationCityChange = (e) => {
    setLocationCity(e.target.value);
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

  return (
    <UpdateWrapper>
      <SearchWrapper>
        <TextField
          id="searchLocations"
          value={locationName}
          onChange={handleLocationNameChange}
          className="InputSearchCustomization"
          placeholder="Location, Anschrift o.ä. suchen"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="searchLocations"
          value={locationCity}
          onChange={handleLocationCityChange}
          className="InputSearchCustomization"
          placeholder="Location, Anschrift o.ä. suchen"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="select-locationType"
          select
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
        <TextField
          id="searchLocations"
          value={locationCity}
          onChange={handleLocationCityChange}
          className="InputSearchCustomization"
          placeholder="Location, Anschrift o.ä. suchen"
          variant="outlined"
          fullWidth
        />
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
            {image ? image.name : "Upload"}
          </Button>
        </label>
        {locationName && locationCity ? (
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
      {/* <img src={image} alt="Test" /> */}
    </UpdateWrapper>
  );
}

const UpdateWrapper = styled.div`
  position: relative;
  width: auto;
  max-width: 100%;
`;

const SearchWrapper = styled.form`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

const Input = styled("input")({
  display: "none",
});

export default AddLocation;
