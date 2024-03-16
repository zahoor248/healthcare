import React, { useState } from "react";
import "./Sidebar.css";
import FilterIcon from "../../assets/images/filter-solid.png";
import TagSelector from "../TagSelector/TagSelector";
import PriceRange from "../PriceRange/PriceRange";
import Slider from "@mui/material/Slider";
import CommonPrimaryButton from "../CommonPrimaryButton";
import { getAllPros } from "../../Store/Actions/Actions";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useDispatch } from "react-redux";

export default function Sidebar({
  data,
  filteredData,
  setFilteredData,
  zipCodeUser,
  licenseTypes,
}) {
  const [value, setValue] = useState([20, 37]);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const licenses = data
    ?.flatMap((item) => item?.licenses || [])
    .filter(
      (license, index, self) =>
        index === self.findIndex((l) => l && l.id === license.id)
    );

  console.log(data, "velvelvelo");

  const [filterConditions, setFilterConditions] = useState({
    tags: [], // You can store selected tags here
    license: "", // You can store selected licenses here
    searchBase: zipCodeUser, // You can store selected
    rateBase: "hourly_rate", // You can store selected
    rates: {
      min: 0, // You can store the min rate here
      max: 0, // You can store the max rate here
    },
  });

  const filterData = (reset) => {
    if (reset) {
      handleAPIRequest("get", "pros", null)
        .then((response) => {
          if (response) {
            console.log(response);
            dispatch(getAllPros(response));
            setFilteredData(response);
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
        });
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

    handleAPIRequest("get", "pros", null, {
      filters: {
        license: filterConditions.license
          ? filterConditions.license.abbrev
          : "",
        zip: filterConditions.searchBase,
        rate: filterConditions.rates.max,
        rateType: filterConditions.rateBase ? "hourly" : "daily",
      },
    })
      .then((response) => {
        if (response) {
          dispatch(getAllPros(response));
          setFilteredData(response);
          setFilter(false);
        }
      })
      .catch((e) => {
        setFilter(false);
      });
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
        rateBase: !e.target.checked,
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

        <div className="w-full md:w-64">
          <div className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full">
            {filterConditions.license
              ? filterConditions.license.name
              : "Selected license type"}
          </div>
          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200">
            {licenseTypes.map((item, index) => (
              <li
                key={index}
                className={`p-4 cursor-pointer hover:bg-gray-100 ${"bg-white-100"}`}
                onClick={() => {
                  setFilterConditions({ ...filter, license: item });
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 ">
        {/* <div className="flex items-center gap-2">
          <label class="switch">
            <input type="checkbox" onChange={(e) => handleChangeRate(e)} />
            <span class="slider"></span>
          </label>
          <p className="text-lg">
            {filterConditions.rateBase ? "Hourly" : "Daily"} Rate
          </p>
        </div> */}
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

      <div className="pt-4 flex gap-4 justify-center md:justify-end md:pt-8">
        <CommonPrimaryButton
          onClick={() => filterData(true)}
          loading={loading}
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
