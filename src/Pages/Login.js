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
import DaLuLogo from "../svgs/dalu-logo.svg";

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
        console.log(data[0]);
        onLoginSuccess(data);
      } else {
        setLoginError(true);
      }
    }
  }
  return (
    <LoginPage>
      <StyledDaLuLogo src={DaLuLogo} alt="DaLu Logo" />
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
          {emailValue && passwordValue !== "" ? (
            <Button variant="contained" type="submit" fullWidth>
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
  object-fit: cover;
  background-color: #eeeeee;
`;

const StyledDaLuLogo = styled.img`
  width: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
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
`;

export default Login;
