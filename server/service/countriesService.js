import { countriesURL } from "../constants/urls.js";

export const getCountries = async () => {
  try {
    const response = await fetch(countriesURL);
    const countriesData = await response.json();
    const countriesList = countriesData.map((country) => country.name?.common);
    return countriesList;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to fetch countries");
  }
};
