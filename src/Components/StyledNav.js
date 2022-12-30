import "../App.css";
import "../index.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import DaLuLogo from "../images/DaLu-Logo.svg";
import { useEffect } from "react";

export default function StyledNav({ activeUser, onLogoutClick, activeTab }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);

  return (
    <StyledTopBar>
      <UpperNavBar>
        <StyledLogo src={DaLuLogo} />
        <div>
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
        </div>
      </UpperNavBar>
      <BottomNavBar>
        <Link className="NavBarLink" to="/">
          Dashboard
        </Link>
        <Link className="NavBarLink" to="/bearbeiten">
          Bearbeiten
        </Link>
        <Link className="NavBarLink" to="/hinzufuegen">
          Hinzufügen
        </Link>
        <Link className="NavBarLink" to="">
          Speisekarte
        </Link>
      </BottomNavBar>
    </StyledTopBar>
  );
}

const StyledTopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledLogo = styled.img`
  height: 30px;
  width: auto;
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

const StyledUserData = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  justify-self: flex-end;
`;
