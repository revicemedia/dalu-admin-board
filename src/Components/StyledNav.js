import "../App.css";
import "../index.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import DaLuLogo from "../images/DaLu-Logo.svg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuIcon from "../svgs/Icons/menu.svg";

export default function StyledNav({ activeUser, onLogoutClick }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <StyledTopBar>
      <UpperNavBar>
        <StyledLogo src={DaLuLogo} />
        {activeUser && (
          <div>
            <StyledUserData>
              {activeUser ? (
                <Avatar
                  {...stringAvatar(
                    activeUser.userFirstName + " " + activeUser.userLastName
                  )}
                  className="NavbarAvatar"
                />
              ) : (
                <Avatar
                  className="NavbarAvatar"
                  {...stringAvatar("Nicht angemeldet")}
                />
              )}
              {activeUser && (
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
              )}
              <IconButton onClick={onLogoutClick}>
                <LogoutIcon className="LogoutButtonStyling" />
              </IconButton>
            </StyledUserData>
            {activeUser && (
              <MobileMenu>
                <TheMenuIcon src={MenuIcon} />
              </MobileMenu>
            )}
          </div>
        )}
      </UpperNavBar>
      {activeUser && (
        <BottomNavBar>
          <Link
            className={
              location.pathname === "/" ? "NavBarLink_Active" : "NavBarLink"
            }
            to="/"
          >
            Dashboard
          </Link>
          <Link
            className={
              location.pathname === "/bearbeiten"
                ? "NavBarLink_Active"
                : "NavBarLink"
            }
            to="/bearbeiten"
          >
            Bearbeiten
          </Link>
          <Link
            className={
              location.pathname === "/hinzufuegen"
                ? "NavBarLink_Active"
                : "NavBarLink"
            }
            to="/hinzufuegen"
          >
            Hinzufügen
          </Link>
          {/* {activeUser && activeUser.userIsManager === "true" && (
            <Link
              className={
                location.pathname === "/speisekarte"
                  ? "NavBarLink_Active"
                  : "NavBarLink"
              }
              to="/speisekarte"
            >
              Speisekarte
            </Link>
          )} */}
          <Link
            className={
              location.pathname === "/karte"
                ? "NavBarLink_Active"
                : "NavBarLink"
            }
            to="/karte"
          >
            Karte
          </Link>
        </BottomNavBar>
      )}
    </StyledTopBar>
  );
}

const StyledTopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 2000;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px 0px, rgb(0 0 0 / 6%) 0px 0px 2px 0px;
  position: fixed;

  @media screen and (max-width: 1140px) {
    padding: 0 10px;
  }
`;

const StyledLogo = styled.img`
  height: 30px;
  width: auto;
  user-select: none;
`;

const UpperNavBar = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 20px 0;
  max-width: 1120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomNavBar = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  display: flex;
  justify-content: center;
  overflow: scroll;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  width: auto;
  height: 100%;

  @media screen and (max-width: 640px) {
    display: block;
  }
`;

const TheMenuIcon = styled.img`
  width: 30px;
  height: 30px;
  user-select: none;
`;

const FullNameParagraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledH4 = styled.h4`
  font-weight: 500;
  color: #3d3d3d;
  font-size: 0.8rem;
`;

const StyledAdminManager = styled.p`
  font-weight: 400;
  font-size: 0.7rem;
  color: #3790af;
`;

const StyledUserData = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  justify-self: flex-end;
  align-items: center;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;
