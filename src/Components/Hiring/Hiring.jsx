import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Hiring.css";
import ProfessionalCard from "../ProfessionalCard/ProfessionalCard";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav, getAllPros } from "../../Store/Actions/Actions";
export default function Hiring() {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const professionals = useSelector((state) => state.pros);
  const [data, setData] = useState(professionals);
  const [filteredData, setFilteredData] = useState(professionals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleAPIRequest("get", "pros", null)
      .then((response) => {
        if (response) {
          console.log(response);
          dispatch(getAllPros(response));
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
      });

    handleAPIRequest("get", "favorites", null)
      .then((response) => {
        dispatch(getAllFav(response.favorites));
      })
      .catch((error) => {});
    setData(professionals);
    setFilteredData(professionals);
  }, [loading]);

  // handling sort here
  const handleSortItem = (e) => {
    const sortedData = [...professionals];
    if (e.toLowerCase() === "daily rate") {
      sortedData.sort((a, b) => {
        const rateA = a.pro_profile?.daily_rate;
        const rateB = b.pro_profile?.daily_rate;

        if (rateA === undefined && rateB === undefined) {
          return 0;
        }
        if (rateA === undefined) {
          return 1;
        }
        if (rateB === undefined) {
          return -1;
        }

        return rateB - rateA; // Sort in descending order by daily rate
      });
    } else {
      sortedData.sort((a, b) => {
        const rateA = a.pro_profile?.hourly_rate;
        const rateB = b.pro_profile?.hourly_rate;

        if (rateA === undefined && rateB === undefined) {
          return 0;
        }
        if (rateA === undefined) {
          return 1;
        }
        if (rateB === undefined) {
          return -1;
        }

        return rateB - rateA;
      });
    }

    // Update the state with the sorted data
    setFilteredData(sortedData);
  };

  return (
    <>
      {" "}
      {loading ? (
        <div className="flex transition-all ease-in-out duration-500 justify-center items-center my-auto w-full h-[100vh] bg-[#e5f0ff] ">
          <svg viewBox="0 0 240 240" height="240" width="240" class="pl">
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-330"
              stroke-dasharray="0 660"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="105"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--a"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dashoffset="-110"
              stroke-dasharray="0 220"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="35"
              cy="120"
              cx="120"
              class="pl__ring pl__ring--b"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="85"
              class="pl__ring pl__ring--c"
            ></circle>
            <circle
              stroke-linecap="round"
              stroke-dasharray="0 440"
              stroke-width="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="155"
              class="pl__ring pl__ring--d"
            ></circle>
          </svg>
        </div>
      ) : (
        <div>
          <div className=" bg-[#e5f0ff] pb-40 flex ">
            <h1 className="xl:text-4xl px-6 xl:px-32 md:text-2xl whitespace-pre-wrap sm:text-xl  font-bold leading-[1.3] md:!leading-[1.42] ">
              Healthcare professionals Ready to hire.
            </h1>
          </div>
          <div className="flex -mt-32 xl:-mt-28 f md:flex-row w-full px-6 xl:px-24 2xl:px-32">
            <div className="flex w-full flex-col md:flex-row relative bg-white  shadow-class p-6 md:p-4 lg:p-8 xl:p-14 rounded-2xl">
              <div className="card-section-header absolute right-4 justify-between items-center  md:!hidden">
                <div className="flex gap-2">
                  <p>Sort by:</p>
                  <select
                    className="bg-blue-400 hover:bg-blue-500 transition-all ease-in-out duration-300 pr-1 !rounded-[2px] text-white"
                    onChange={(e) => handleSortItem(e.target.value)}
                  >
                    <option>Hourly Rate</option>
                    <option>Daily Rate</option>
                  </select>
                </div>

                {/* <div className="pagi-icons flex items-center">
                <IoIosArrowDropleft className="mr-2" />
                <IoIosArrowDropright />
              </div> */}
              </div>
              <div className="">
                <Sidebar
                  data={data}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                />
              </div>
              <div className="xl:pl-14 lg:pl-10 md:pl-6 w-full">
                {/* sorting large screen  */}
                <div className="card-section-header  justify-between items-center !hidden md:!flex">
                  <div className="flex gap-2">
                    <p>Sort by:</p>
                    <select
                      className="bg-blue-400 hover:bg-blue-500 transition-all ease-in-out duration-300 pr-1 !rounded-[2px] text-white"
                      onChange={(e) => handleSortItem(e.target.value)}
                    >
                      <option>Hourly Rate</option>
                      <option>Daily Rate</option>
                    </select>
                  </div>

                  {/* <div className="pagi-icons flex items-center">
                <IoIosArrowDropleft className="mr-2" />
                <IoIosArrowDropright />
              </div> */}
                </div>

                <div>
                  <ProfessionalCard
                    data={filteredData}
                    setFilteredData={setFilteredData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
