import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import FilterIcon from "../../assets/images/filter-solid.png";
import TagSelector from "../TagSelector/TagSelector";
import PriceRange from "../PriceRange/PriceRange";
import Slider from "@mui/material/Slider";

export default function Sidebar({ data, filteredData, setFilteredData }) {
  const [check, setCheck] = useState("");
  const [value, setValue] = useState([20, 37]);

  const licenses = data
    .map((item) => item.licenses.map((license) => license.abbrev))
    .flat();

  const [filterConditions, setFilterConditions] = useState({
    tags: [], // You can store selected tags here
    license: [], // You can store selected licenses here
    rates: {
      min: 0, // You can store the min rate here
      max: 0, // You can store the max rate here
    },
  });
  const handleFilterByLicense = (license) => {
    setFilterConditions((prevFilterConditions) => {
      if (prevFilterConditions.license.includes(license)) {
        return {
          ...prevFilterConditions,
          license: prevFilterConditions.license.filter(
            (lic) => lic !== license
          ),
        };
      } else {
        return {
          ...prevFilterConditions,
          license: [...prevFilterConditions.license, license],
        };
      }
    });
  };

  const filterData = () => {
    let temp = [...data];

    // Filter based on selected tags
    // if (filterConditions.tags.length > 0) {
    //   temp = temp.filter((item) => {
    //     // Replace 'tagProperty' with the actual property to filter by tags
    //     if (item.tagProperty) {
    //       return filterConditions.tags.every((tag) =>
    //         item.tagProperty.includes(tag)
    //       );
    //     }
    //     return false;
    //   });
    // }
    console.log(filterConditions.license);
    // Filter based on selected licenses
    if (filterConditions.license.length > 0) {
      temp = temp.filter((item) => {
        if (item.licenses && item.licenses.length > 0) {
          return item.licenses.some((license) =>
            filterConditions.license.includes(license.abbrev)
          );
        }
        return false;
      });
    }

    // Filter based on selected hourly rates
    temp = temp.filter((item) => {
      const rate = item.pro_profile?.hourly_rate;
      return (
        rate >= filterConditions.rates.min && rate <= filterConditions.rates.max
      );
    });

    // Update the state with the filtered data
    setFilteredData(temp);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterConditions.rates.min = newValue[0];
    filterConditions.rates.max = newValue[1];
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <div className="w-full md:w-[250px] 2xl:min-w-[330px]">
      <div className="flex pb-3 items-center gap-2">
        <img className="w-4 h-4" src={FilterIcon} alt="filter icon" />
        <p className=" text-lg">Filters</p>
      </div>

      <div className="border-b"></div>

      <div className=" pt-8">
        <p className="text-lg pb-2">Tags</p>

        <TagSelector />
      </div>

      <div className="pt-8">
        <p className="text-lg pb-2">License Type</p>

        {/* All licences list */}
        {licenses.map((license, key) => (
          <div className=" flex items-center cursor-default" key={key}>
            <input
              type="checkbox"
              onChange={() => handleFilterByLicense(license)}
              value={filterConditions.license.includes(license) ? true : false}
              class="ui-checkbox"
            ></input>
            {/* <input className="check-box cursor-pointer" type="checkbox" /> */}
            <p className="text-neutral-600 px-3 text-lg">{license}</p>
          </div>
        ))}
      </div>

      <div className=" pt-8">
        <p className="text-lg">Hourly Rate</p>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{
            width: "90%",
            marginTop: "20px",
            "& .MuiSlider-thumb": {
              borderRadius: "4px",
            },
          }}
        />
      </div>

      <div className="pt-8">
        <button
          className="hover:bg-blue-700 transition-all ease-in-out duration-500 py-3 w-full bg-blue-600 rounded-xl text-white "
          onClick={() => filterData()}
        >
          Refine
        </button>
      </div>
    </div>
  );
}
