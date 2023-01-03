import "../App.css";
import "../index.css";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import StyledNav from "../Components/StyledNav";

function Login({ onLoginSuccess }) {
  const [activeUser, setActiveUser] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleEmailChange(e) {
    setEmailValue(e.target.value);
  }

  function handlePasswordChange(e) {
    setPasswordValue(e.target.value);
  }

  console.log(activeUser);

  function tryLogin(e) {
    e.preventDefault();
    const loginEmail = emailValue;
    const loginPassword = passwordValue;

    fetchText(loginEmail, loginPassword);

    async function fetchText(loginEmail, loginPassword) {
      let response = await fetch(
        "https://dalu-api-delivery-service.com/userLogin.php?loginEmail=" +
          loginEmail +
          "&loginPassword=" +
          loginPassword
      );
      let data = await response.json();
      if (data) {
        setActiveUser(data);
        setLoginError(false);
        onLoginSuccess(data);
      } else {
        setLoginError(true);
      }
    }
  }
  return (
    <LoginPage>
      <StyledNav />
      <LoginOuterWrapper>
        <LoginWrapper onSubmit={tryLogin}>
          <TextField
            id="email"
            value={emailValue}
            onChange={handleEmailChange}
            className="InputSearchCustomization"
            placeholder="E-Mail"
            variant="outlined"
            fullWidth
          />
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            className="InputSearchCustomization"
            placeholder="Passwort"
            fullWidth
            value={passwordValue}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {emailValue.length && passwordValue.length !== 0 ? (
            <Button
              variant="contained"
              type="submit"
              fullWidth
              className="Button-additions"
            >
              Login
            </Button>
          ) : (
            <Button variant="contained" disabled fullWidth>
              Login
            </Button>
          )}
          {loginError && (
            <Alert severity="error">Bitte überprüfe deine Eingaben!</Alert>
          )}
        </LoginWrapper>
      </LoginOuterWrapper>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #eeeeee;
  position: static;
`;

const LoginOuterWrapper = styled.div`
  overflow: hidden;
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoginWrapper = styled.form`
  z-index: 1;
  min-width: 400px;
  max-width: 500px;
  border-radius: 10px;
  height: auto;
  padding: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  background-color: #fff;

  @media screen and (max-width: 420px) {
    max-width: calc(100vw 20px);
    min-width: calc(100vw - 20px);
  }
`;

export default Login;
