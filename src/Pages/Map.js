import "../App.css";
import "../index.css";
import styled from "styled-components";
import StyledNav from "../Components/StyledNav";
import Map from "../Components/Map";

function MapComponent({ activeUser, onLogoutClick }) {
  return (
    <div className="root-wrapper">
      <MainWrapper>
        <StyledNav activeUser={activeUser} onLogoutClick={onLogoutClick} />
        <RightWrapper>
          <Map />
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
  min-width: 100%;
  min-height: 100%;
  width: auto;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 108px;

  @media screen and (max-width: 640px) {
    padding-top: 74px;
  }
`;

export default MapComponent;
