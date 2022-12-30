import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Pages/Index.js";
import Login from "./Pages/Login";
import { getAllLocations } from "./functions/getLocations.js";
import UpdatePage from "./Components/UpdateLocations";

export default function App() {
  const [activeUser, setActiveUser] = useState();
  const [allLocations, setAllLocations] = useState();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const onLoginSuccess = (data) => {
    setActiveUser(data[0]);
    onSetActiveUser(data);
  };

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

  useEffect(() => {
    if (userIsLoggedIn) {
      getAllLocations(activeUser).then((data) => {
        setAllLocations(data);
      });
    }
  }, [activeUser, userIsLoggedIn]);

  const onLogoutClick = () => {
    setActiveUser(null);
    setUserIsLoggedIn(false);
    localStorage.clear();
  };

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

  return (
    <BrowserRouter>
      <Routes>
        {activeUser ? (
          <>
            <Route
              path="/"
              element={
                <Index activeUser={activeUser} onLogoutClick={onLogoutClick} />
              }
            />
            <Route
              path="/bearbeiten"
              element={
                <UpdatePage
                  activeUser={activeUser}
                  onLogoutClick={onLogoutClick}
                  allLocations={allLocations}
                />
              }
            />
          </>
        ) : (
          <Route path="*" element={<Login onLoginSuccess={onLoginSuccess} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
