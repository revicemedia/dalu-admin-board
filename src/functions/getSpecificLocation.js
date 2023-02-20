export const getSpecificLocation = (activeUser, locationId) =>
  fetch(
    "https://dalu-api-delivery-service.com/getSpecificLocation.php?um=" +
      activeUser.userMail +
      "&ut=" +
      activeUser.userAuthToken +
      "&locationId=" +
      locationId
  ).then((response) => response.json());
