export const userLogin = (loginEmail, loginPassword) =>
  fetch(
    "https://dalu-api-delivery-service.com/userLogin.php?loginEmail=" +
      loginEmail +
      "&loginPassword=" +
      loginPassword
  ).then((response) => response.json());
