export const getAllLocations = (activeUser) =>
  fetch(
    "https://dalu-api-delivery-service.com/getAllData?um=" +
      activeUser.userMail +
      "&ut=" +
      activeUser.userAuthToken
  ).then((response) => response.json());
