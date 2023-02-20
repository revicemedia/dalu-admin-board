export const getAllUserMails = (activeUser) =>
  fetch(
    "https://dalu-api-delivery-service.com/getAllUserMails.php?um=" +
      activeUser.userMail +
      "&ut=" +
      activeUser.userAuthToken
  )
    .then((response) => response.json())
    .catch((error) => console.log(error.message));
