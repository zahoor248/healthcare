import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import FilterIcon from "../../assets/images/filter-solid.png";
import TagSelector from "../TagSelector/TagSelector";
import PriceRange from "../PriceRange/PriceRange";

export default function Sidebar({ data, filteredData, setFilteredData }) {
  const [check, setCheck] = useState("");
  const licenses = data
    .map((item) => item.licenses.map((license) => license.abbrev))
    .flat();

  const filterConditions = {
    tags: [],
    license: [],
    rates: {
      min: 0,
      max: 0,
    },
  };

  const handleFilterByLicense = (license) => {
    if (filterConditions.license.includes(license)) {
      filterConditions.license = filterConditions.license.filter(
        (lic) => lic !== license
      );
    } else {
      filterConditions.license.push(license);
    }
  };

  const filterData = () => {
    let temp = data;

    Object.keys(filterConditions).forEach((key) => {
      if (key === "tags") {
        // Handle tags filtering if needed
      } else if (key === "license") {
        if (filterConditions.license.length > 0) {
          // Filter based on selected abbreviations
          temp = temp.filter((item) => {
            if (item.licenses && item.licenses.length > 0) {
              return item.licenses.some((license) =>
                filterConditions.license.includes(license.abbrev)
              );
            }
            return false;
          });
        }
      } else if (key === "rates") {
        // Handle rates filtering if needed
      }
    });

    setFilteredData(temp);
  };

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

        <PriceRange />
      </div>

      <div className="pt-8">
        <button
          className="hover:bg-blue-700 transition-all ease-in-out duration-500 py-3 w-full bg-blue-600 rounded-xl text-white "
          onClick={filterData}
        >
          Refine
        </button>
      </div>
    </div>
  );
}
