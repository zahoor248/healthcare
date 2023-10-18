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
    <div className="sidebar-container">
      <div className="filter-head">
        <img className="filter-head-img" src={FilterIcon} alt="filter icon" />
        <p className="filter-text">Filters</p>
      </div>

      <div className="border-filter"></div>

      <div className="tag-section">
        <div className="tags">
          <p className="tag-text">Tags</p>
        </div>

        <div className="tag-selector">
          <TagSelector />
        </div>
      </div>

      <div className="license-section">
        <div className="tags">
          <p className="license-text">License</p>
        </div>
        {/* All licences list */}
        {licenses.map((license, key) => (
          <div
            className="license-selector2 flex items-center cursor-default"
            key={key}
          >
            <input
              className="check-box cursor-pointer"
              type="checkbox"
              onChange={() => handleFilterByLicense(license)}
              value={filterConditions.license.includes(license) ? true : false}
            />
            <p className="license1">{license}</p>
          </div>
        ))}
      </div>

      <div className="price-section">
        <div className="tags">
          <p className="price-text">Hourly Rate</p>
        </div>
        <PriceRange />
      </div>

      <div className="refine-btn-container">
        <button className="filter-button" onClick={filterData}>
          Refine
        </button>
      </div>
    </div>
  );
}
