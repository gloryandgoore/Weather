import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
        const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
        const result = await response.json();
        return {
            options: result.data.map((city) => {
                return {
                  //values of lon and lat needed to search city in weather api
                    value: `${city.latitude} ${city.longitude}`,

                  //name and countryCode displayed in Search bar
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),
        };
    } catch (error) {
        console.error(error);
    }
};
//onChange when user starts typing use their input to search cities
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    //returns search results
    <AsyncPaginate
      placeholder="Enter Location"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
