import "../App.css";
import "../index.css";
import styled from "styled-components";
import StyledNav from "../Components/StyledNav";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpecificLocation } from "../functions/getSpecificLocation";
import CircularProgress from "@mui/material/CircularProgress";

function LocationDetail({ activeUser, onLogoutClick }) {
  const [activeLocation, setActiveLocation] = useState(null);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    getSpecificLocation(activeUser, id)
      .then((data) => {
        setActiveLocation(data);
      })
      .catch((error) => console.log(error.message));
  }, [activeUser, id]);

  useEffect(() => {
    console.log(activeLocation);
  }, [activeLocation]);

  return (
    <div className="root-wrapper">
      <MainWrapper>
        <StyledNav activeUser={activeUser} onLogoutClick={onLogoutClick} />
        {activeLocation ? (
          <RightWrapper>
            <ContentWrapper>{id}</ContentWrapper>
            <p>{location.pathname}</p>
          </RightWrapper>
        ) : (
          <LoaderWrapper>
            <CircularProgress />
          </LoaderWrapper>
        )}
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 138px;
`;

const RightWrapper = styled.div`
  height: auto;
  width: auto;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 138px;

  @media screen and (max-width: 640px) {
    padding-top: 104px;
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

export default LocationDetail;
