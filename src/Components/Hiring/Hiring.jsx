import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Hiring.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import ProfessionalCard from "../ProfessionalCard/ProfessionalCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav, getAllPros } from "../../Store/Actions/Actions";
export default function Hiring() {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const professionals = useSelector((state) => state.pros);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [item, setItems] = useState([]);
  const getAllLincensesTypes = () => {
    handleAPIRequest("get", "license-types", null).then((response) => {
      let newArray = [];
      if (response.data.license_types) {
        response.data.license_types.map((item) => {
          newArray.push({
            ...item,
            value: item.id,
            label: item.name,
          });
        });

        setItems(newArray);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllLincensesTypes();

    handleAPIRequest("get", "favorites", null)
      .then((response) => {
        console.warn(response, "Helelelelelelele");

        dispatch(getAllFav(response.favorites));

        handleAPIRequest("get", "pros", null)
          .then((response) => {
            if (response) {
              // console.warn(response);
              dispatch(getAllPros(response));

              setFilteredData(response);
              setLoading(false);

              // AsyncStorage.setItem('User', JSON.stringify(response.user));
            }
          })
          .catch((e) => {
            setLoading(false);
          });
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      <div className="hiring-heading">
        <h1 className="text-2xl font-bold">
          Healthcare Professionals Ready to Hire.
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="hiring-container">
            <div className="filter-sidebar">
              <Sidebar />
            </div>

            <div
              className="modal fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
              id="staticBackdrop"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div id="modal-body-content"></div>
                </div>
              </div>
            </div>
            <div className="hiring-card-section">
              <div className="card-section-header flex justify-between items-center">
                <div className="sort-by">
                  <p>Sort by:</p>
                  <select
                    className="sort-options"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option>Lorem Ipsum</option>
                    <option>Lorem Ipsum</option>
                    <option>Lorem Ipsum</option>
                  </select>
                </div>

                <div className="pagi-icons flex items-center">
                  <IoIosArrowDropleft className="mr-2" />
                  <IoIosArrowDropright />
                </div>
              </div>

              <div>
                <ProfessionalCard data={professionals} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
