import "./App.css";
import "./index.css";
import styled from "styled-components";
import Sidebar from "./Components/Sidebar";
import { useState, useEffect } from "react";
import { getAllLocations } from "./functions/getLocations.js";
import Login from "./Pages/Login";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import UpdatePage from "./Components/UpdateLocations";
import AddLocation from "./Components/AddLocation";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeUser, setActiveUser] = useState();
  const [allLocations, setAllLocations] = useState();
  const [searchFilter, setSearchFilter] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const onHandleActiveTab = (Tab) => {
    setActiveTab(Tab);
  };

  const onLoginSuccess = (data) => {
    setActiveUser(data[0]);
    onSetActiveUser(data);
  };

  const onLogoutClick = () => {
    setActiveUser(null);
    setUserIsLoggedIn(false);
    localStorage.clear();
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    if (userIsLoggedIn) {
      getAllLocations(activeUser).then((data) => {
        setAllLocations(data);
      });
    }
  }, [activeUser, userIsLoggedIn]);

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
            loc.locationType.toLowerCase().includes(finalSearch.toLowerCase())
        )
      );
      if (filteredLocations.length === 1) {
        console.log(filteredLocations);
      }
    } else {
      setSearchFilter(false);
      setFilteredLocations([]);
    }
  }

  useEffect(() => {
    function getLocalUser() {
      const userAuthToken = localStorage.getItem("userAuthToken");
      const userFirstName = localStorage.getItem("userFirstName");
      const userLastName = localStorage.getItem("userLastName");
      const userMail = localStorage.getItem("userMail");
      const userIsManager = localStorage.getItem("userIsManager");
      const userIsAdmin = localStorage.getItem("userIsAdmin");
      if (userAuthToken && userMail) {
        setActiveUser({
          userAuthToken,
          userFirstName,
          userLastName,
          userMail,
          userIsManager,
          userIsAdmin,
        });
        setUserIsLoggedIn(true);
      }
    }
    getLocalUser();
  }, []);

  function onSetActiveUser(data) {
    setActiveUser(data[0]);
    setUserIsLoggedIn(true);
    localStorage.setItem("userAuthToken", data[0].userAuthToken);
    localStorage.setItem("userFirstName", data[0].userFirstName);
    localStorage.setItem("userLastName", data[0].userLastName);
    localStorage.setItem("userMail", data[0].userMail);
    localStorage.setItem("userIsManager", data[0].userIsManager);
    localStorage.setItem("userIsAdmin", data[0].userIsAdmin);
  }

  return (
    <div className="root-wrapper">
      {activeUser ? (
        <MainWrapper>
          <Sidebar
            activeTab={activeTab}
            activeUser={activeUser}
            onHandleActiveTab={onHandleActiveTab}
          />
          <RightWrapper>
            <StyledTopBar>
              <BadgeAndDivider>
                <Badge badgeContent={4} color="primary">
                  <NotificationsNoneIcon color="action" />
                </Badge>
                <Divider orientation="vertical" variant="middle" flexItem />
              </BadgeAndDivider>
              <StyledUserData>
                {activeUser ? (
                  <Avatar
                    {...stringAvatar(
                      activeUser.userFirstName + " " + activeUser.userLastName
                    )}
                  />
                ) : (
                  <Avatar {...stringAvatar("Nicht angemeldet")} />
                )}

                <FullNameParagraph>
                  <StyledH4>
                    {activeUser
                      ? activeUser.userFirstName + " " + activeUser.userLastName
                      : "Nicht angemeldet"}
                  </StyledH4>
                  <StyledAdminManager>
                    {activeUser.userIsManager
                      ? "Manager"
                      : activeUser.userIsAdmin
                      ? "Admin"
                      : "Rolle"}
                  </StyledAdminManager>
                </FullNameParagraph>
                <IconButton onClick={onLogoutClick}>
                  <LogoutIcon />
                </IconButton>
              </StyledUserData>
            </StyledTopBar>
            <ContentWrapper>
              {activeTab === 1 ? (
                <h3>Dashboard</h3>
              ) : activeTab === 2 ? (
                <AddLocation />
              ) : activeTab === 3 ? (
                <UpdatePage
                  allLocations={
                    !searchFilter ? allLocations : filteredLocations
                  }
                  onSearchSubmit={onSearchSubmit}
                />
              ) : (
                "Nichts mehr"
              )}
            </ContentWrapper>
          </RightWrapper>
        </MainWrapper>
      ) : (
        <Login onLoginSuccess={onLoginSuccess} />
      )}
    </div>
  );
}

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
  overflow: hidden;
`;

const RightWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 20px; */
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  height: 100%;
  overflow: scroll;
`;

const StyledTopBar = styled.div`
  width: 100%;
  background-color: #fff;
  min-height: 110px;
  height: 110px;
  display: flex;
  padding: 0px 40px;
  align-items: center;
  justify-content: flex-end;
`;

const FullNameParagraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledH4 = styled.h4`
  font-weight: 600;
  color: #3d3d3d;
`;

const StyledAdminManager = styled.p`
  font-weight: 400;
  font-size: 0.8rem;
  color: #3790af;
`;

const BadgeAndDivider = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
`;

const StyledUserData = styled.div`
  padding-left: 10px;
  width: auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  justify-self: flex-end;
`;
export default App;
