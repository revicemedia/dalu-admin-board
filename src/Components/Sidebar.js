import "../App.css";
import "../index.css";
import styled from "styled-components";
import DaLuLogo from "../svgs/dalu-logo.svg";
import DashboardIcon from "../svgs/Dashboard.svg";
import AddLocationIcon from "../svgs/Location.svg";

function Sidebar({ activeTab, activeUser, onHandleActiveTab }) {
  const handleActiveTab = (Tab) => {
    onHandleActiveTab(Tab);
  };
  return (
    <div className="root-wrapper">
      <MainWrapper>
        <LogoWrapper>
          <StyledLogo src={DaLuLogo} alt="DaLu Logo" />
        </LogoWrapper>
        <NavigationWrapper>
          <StyledLink
            onClick={() => handleActiveTab(1)}
            activeTab={activeTab === 1}
          >
            <LinkImage
              activeTab={activeTab === 1}
              src={DashboardIcon}
              alt="Icon"
            />
            <StyledPTag>Dashboard</StyledPTag>
          </StyledLink>
          {activeUser.userIsManager && (
            <StyledLink
              onClick={() => handleActiveTab(2)}
              activeTab={activeTab === 2}
            >
              <LinkImage
                activeTab={activeTab === 2}
                src={AddLocationIcon}
                alt="Icon"
              />
              <StyledPTag>Hinzufügen</StyledPTag>
            </StyledLink>
          )}
          <StyledLink
            onClick={() => handleActiveTab(3)}
            activeTab={activeTab === 3}
          >
            <LinkImage
              activeTab={activeTab === 3}
              src={AddLocationIcon}
              alt="Icon"
            />
            <StyledPTag>Update Locations</StyledPTag>
          </StyledLink>
          <StyledLink
            onClick={() => handleActiveTab(4)}
            activeTab={activeTab === 4}
          >
            <LinkImage
              activeTab={activeTab === 4}
              src={AddLocationIcon}
              alt="Icon"
            />
            <StyledPTag>Hinzufügen</StyledPTag>
          </StyledLink>
          <StyledLink
            onClick={() => handleActiveTab(5)}
            activeTab={activeTab === 5}
          >
            <LinkImage
              activeTab={activeTab === 5}
              src={AddLocationIcon}
              alt="Icon"
            />
            <StyledPTag>Hinzufügen</StyledPTag>
          </StyledLink>
          <StyledLink
            onClick={() => handleActiveTab(6)}
            activeTab={activeTab === 6}
          >
            <LinkImage
              activeTab={activeTab === 6}
              src={AddLocationIcon}
              alt="Icon"
            />
            <StyledPTag>Logout</StyledPTag>
          </StyledLink>
        </NavigationWrapper>
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
  position: relative;
  width: auto;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const LogoWrapper = styled.div`
  display: flex;
  height: 110px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 30%;
  height: auto;
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
`;

const StyledLink = styled.div`
  width: 80%;
  padding: 10px 10px;
  background-color: #113042;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  ${({ activeTab }) =>
    !activeTab &&
    `
    background-color: #fff;
    color: #3d3d3d;
  `};
  &:hover {
    background-color: #113042;
    color: #fff;
    .LinkImage {
      filter: invert(48%) sepia(30%) saturate(90%) hue-rotate(86deg)
        brightness(100%) contrast(119%);
    }
  }
`;

const LinkImage = styled.img`
  width: 25px;
  ${({ activeTab }) =>
    !activeTab &&
    `
    filter: invert(48%) sepia(30%) saturate(50%) hue-rotate(86deg) brightness(100%) contrast(119%);
  `};
`;

const StyledPTag = styled.p`
  font-weight: 400;
  padding-left: 10px;
`;

export default Sidebar;
