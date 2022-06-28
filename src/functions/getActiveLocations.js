export const getAllLocations = () =>
  fetch("https://dalu-api-delivery-service.com/getActiveRestaurants").then(
    (response) => response.json()
  );
