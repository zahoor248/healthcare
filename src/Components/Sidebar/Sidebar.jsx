import React, { useState } from "react";
import "./Sidebar.css";
import FilterIcon from "../../assets/images/filter-solid.png";
import TagSelector from "../TagSelector/TagSelector";
import PriceRange from "../PriceRange/PriceRange";
import Slider from "@mui/material/Slider";
import CommonPrimaryButton from "../CommonPrimaryButton";

export default function Sidebar({ data, filteredData, setFilteredData }) {
  const [value, setValue] = useState([20, 37]);
  const [filter, setFilter] = useState(false);

  const licenses = data
    .flatMap((item) => item.licenses.map((license) => license.abbrev))
    .filter((value, index, self) => self.indexOf(value) === index);

  const [filterConditions, setFilterConditions] = useState({
    tags: [], // You can store selected tags here
    license: [], // You can store selected licenses here
    searchBase: "", // You can store selected
    rateBase: "hourly_rate", // You can store selected
    rates: {
      min: 0, // You can store the min rate here
      max: 0, // You can store the max rate here
    },
  });
  const handleFilterByLicense = (license) => {
    setFilterConditions((prevFilterConditions) => {
      if (filterConditions.license.includes(license)) {
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

  const filterData = (reset) => {
    if (reset) {
      setFilteredData(data);
      setFilterConditions((prevFilterConditions) => {
        return {
          ...prevFilterConditions,
          license: [],
          searchBase: "",
          rates: {
            min: 0, // You can store the min rate here
            max: 0, // You can store the max rate here
          },
        };
      });
      setValue([0, 0]);
      console.log(filterConditions, "filterConditions");
      return;
    }
    setFilter(true);
    let temp = [...data];

    if (filterConditions.license.length) {
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
      const rate =
        filterConditions.rateBase == true
          ? item.pro_profile?.hourly_rate
          : item.pro_profile?.daily_rate;
      return (
        rate >= filterConditions.rates.min && rate <= filterConditions.rates.max
      );
    });
    if (filterConditions.searchBase !== "") {
      temp = temp.filter((item) => {
        console.log(item);
        const zip = item.addresses.map((item) => {
          return item.zip;
        });
        return filterConditions.searchBase.includes(zip);
      });
    }
    // Update the state with the filtered data

    setTimeout(() => {
      setFilteredData(temp);
      setFilter(false);
    }, 1000);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterConditions.rates.min = newValue[0];
    filterConditions.rates.max = newValue[1];
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChangeRate = (e) => {
    setFilterConditions((prevFilterConditions) => {
      return {
        ...prevFilterConditions,
        rateBase: e.target.checked,
      };
    });

    // ({
    //   ...filterConditions,
    //   rateBase: e.target.checked == true ? "hourly_rate" : "daily_rate",
    // });
  };
  return (
    <div className="w-full md:w-[250px] 2xl:min-w-[330px]">
      <div className="flex md:pb-3 items-center gap-2 pb-3">
        <img className="w-4 h-4" src={FilterIcon} alt="filter icon" />
        <p className=" text-lg">Filters</p>
      </div>

      <div className="border-b"></div>

      <div className="pt-4 md:pt-8">
        <p className="text-lg pb-2">Zip Code</p>
        <input
          className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
          label="nickname"
          variant="outlined"
          placeholder="Enter Zip Code here..."
          value={filterConditions.searchBase}
          onChange={(e) =>
            setFilterConditions({
              ...filterConditions,
              searchBase: e.target.value,
            })
          }
        />
      </div>

      <div className="pt-4 md:pt-8">
        <p className="text-lg pb-2">License Type</p>

        {/* All licences list */}
        <div className="flex   flex-wrap  md:gap-1 gap-5">
          {licenses.map((license, key) => (
            <div className=" flex p-2  items-center cursor-default" key={key}>
              <input
                type="checkbox"
                onChange={() => handleFilterByLicense(license)}
                checked={filterConditions.license.includes(license)}
                class="ui-checkbox"
              ></input>
              {/* <input className="check-box cursor-pointer" type="checkbox" /> */}
              <p className="text-neutral-600 px-3 text-lg">{license}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 md:pt-8">
        <div className="flex items-center gap-2">
          <label class="switch">
            <input type="checkbox" onChange={(e) => handleChangeRate(e)} />
            <span class="slider"></span>
          </label>
          <p className="text-lg">
            {filterConditions.rateBase ? "Hourly" : "Daily"} Rate
          </p>
        </div>
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

      <div className="pt-4 flex gap-4 justify-end md:pt-8">
        <CommonPrimaryButton
          onClick={() => filterData(true)}
          loading={false}
          text={"Clear Filters"}
        />
        <CommonPrimaryButton
          onClick={() => filterData()}
          loading={filter}
          text={"Apply Filters"}
        />
      </div>
    </div>
  );
}
