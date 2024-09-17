import { useEffect, useState } from "react";

const useGetCountries = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const getCountryList = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/configuration/countries",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          const errMsg = errData.message || errData.statusText;
          throw new Error(errMsg);
        }

        const data = await response.json();
        const countryFilter = [
          "CA",
          "BR",
          "NZ",
          "FR",
          "ES",
          "AU",
          "IE",
          "IT",
          "JP",
          "CH",
          "DK",
          "BE",
          "PH",
        ];
        const filteredCountries = data.filter((countryData) =>
          countryFilter.some((country) => country === countryData.iso_3166_1)
        );
        setCountries(filteredCountries);
      } catch (error) {
        console.log(error.message);
      }
    };

    getCountryList();

    return () => {
      controller.abort();
    };
  }, []);

  return { countries };
};

export default useGetCountries;
