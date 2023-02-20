import "../App.css";
import "../index.css";
import styled from "styled-components";
import AddLocation from "../Components/AddLocation";
import StyledNav from "../Components/StyledNav";

function AddPage({ activeUser, onLogoutClick }) {
  return (
    <div className="root-wrapper">
      <MainWrapper>
        <StyledNav activeUser={activeUser} onLogoutClick={onLogoutClick} />
        <RightWrapper>
          <ContentWrapper>
            <AddLocation activeUser={activeUser} />
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
  padding-top: 138px;

  @media screen and (max-width: 640px) {
    padding-top: 104px;
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

export default AddPage;
