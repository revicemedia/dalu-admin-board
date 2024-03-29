import "../App.css";
import "../index.css";
import styled from "styled-components";
import * as React from "react";
import CloseIcon from "../svgs/close_white_24dp.svg";
import { useEffect } from "react";

function KontaktDialog({ dialogIsOpen, onCloseClick, activeLocation }) {
  const onSetCloseClick = () => {
    onCloseClick();
  };

  useEffect(() => {
    console.log(activeLocation);
  });

  return (
    <>
      {dialogIsOpen && (
        <StyledOverlay>
          <OverlayWrapper>
            <div>
              <h2>{activeLocation.locationName}</h2>
              <p>
                {activeLocation.userFirstName +
                  " " +
                  activeLocation.userLastName}
              </p>
            </div>
            <div>
              <StyledModalCloseButton onClick={() => onSetCloseClick(true)}>
                <img src={CloseIcon} alt="Close" />
              </StyledModalCloseButton>
            </div>
          </OverlayWrapper>
        </StyledOverlay>
      )}
    </>
  );
}

const StyledOverlay = styled.div`
  left: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: no-drop;
  z-index: 4000;
`;
const OverlayWrapper = styled.div`
  border-radius: 4px;
  width: auto;
  min-width: 350px;
  height: auto;
  padding: 20px;
  background-color: #fff;
  cursor: text;
  display: flex;
  justify-content: space-between;
`;

const StyledModalCloseButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  background-color: #eee;
  display: flex;
`;

export default KontaktDialog;
