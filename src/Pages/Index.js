import "../App.css";
import "../index.css";
import styled from "styled-components";
import StyledNav from "../Components/StyledNav";
import { Link } from "react-router-dom";

function Index({ activeUser, onLogoutClick }) {
  // const [activeUser, setActiveUser] = useState();

  return (
    <div className="root-wrapper">
      <MainWrapper>
        <StyledNav activeUser={activeUser} onLogoutClick={onLogoutClick} />
        <DashboardWrapper>
          <Link className="DashboardLink" to="/support">
            Kontakt
          </Link>
          <Link className="DashboardLink" to="/bearbeiten">
            Bearbeiten
          </Link>
          <Link className="DashboardLink" to="/hinzufuegen">
            Hinzufügen
          </Link>
          <Link className="DashboardLink" to="/karte">
            Karte
          </Link>
        </DashboardWrapper>
      </MainWrapper>
    </div>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
`;

const DashboardWrapper = styled.div`
  height: auto;
  width: auto;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 138px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 690px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media screen and (max-width: 320px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 1140px) {
    padding: 138px 10px;
  }

  @media screen and (max-width: 640px) {
    padding-top: 104px;
  }
`;

export default Index;
