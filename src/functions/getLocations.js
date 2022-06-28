export const getAllLocations = () =>
  fetch(
    "https://dalu-api-delivery-service.com/getActiveAndInactiveRestaurants"
  ).then((response) => response.json());
