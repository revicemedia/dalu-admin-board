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
            <StyledPTag>Nachrichten</StyledPTag>
          </StyledLink>
          {/* <StyledLink
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
          </StyledLink> */}
        </NavigationWrapper>
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
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
  width: 100%;
  padding: 10px 10px;
  color: #113042;
  border-left: 4px solid #113042;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  ${({ activeTab }) =>
    !activeTab &&
    `
    border-left: 4px solid #fff;
  `};
  &:hover {
    background-color: #eeeeee;

    .LinkImage {
      opacity: 1 !important;
    }
  }
`;

const LinkImage = styled.img`
  width: 25px;
  ${({ activeTab }) =>
    !activeTab &&
    `
    opacity: .6;
  `};
  &:hover {
    opacity: 1;
  }
`;

const StyledPTag = styled.p`
  font-weight: 400;
  padding-left: 10px;
`;

export default Sidebar;
