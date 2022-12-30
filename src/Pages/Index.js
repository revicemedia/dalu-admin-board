import "../App.css";
import "../index.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getAllLocations } from "../functions/getLocations.js";
import UpdatePage from "../Components/UpdateLocations";
import AddLocation from "../Components/AddLocation";
import Map from "../Components/Map";
import StyledNav from "../Components/StyledNav";

function Index({ activeUser, onLogoutClick }) {
  // const [activeUser, setActiveUser] = useState();
  const [allLocations, setAllLocations] = useState();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userIsLoggedIn) {
      getAllLocations(activeUser).then((data) => {
        setAllLocations(data);
      });
    }
  }, [activeUser, userIsLoggedIn]);

  return (
    <div className="root-wrapper">
      <MainWrapper>
        <StyledNav activeUser={activeUser} onLogoutClick={onLogoutClick} />
        <RightWrapper>
          <ContentWrapper>
            <AddLocation allLocations={allLocations} />
            <Map allLocations={allLocations} />
          </ContentWrapper>
        </RightWrapper>
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
`;

const RightWrapper = styled.div`
  height: auto;
  width: auto;
  max-width: 1120px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

export default Index;
