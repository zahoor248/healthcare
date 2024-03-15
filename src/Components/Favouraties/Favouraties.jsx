import React, { useEffect, useState } from "react";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Toast from "../AppLoader";
import emptyState from "../../assets/images/add-to-wishlist-icon-1.jpg";
import User from "../../assets/images/holderpic.jpeg";

const Favouraties = () => {
  const [loading, setLoading] = useState(false);
  const favourities = useSelector((state) => state.favourites);
  const location = useLocation();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });
  useEffect(() => {
    console.log(favourities);
    if (
      favourities == null ||
      favourities == undefined ||
      favourities.length == 0
    ) {
      setLoading(true);
      handleAPIRequest("get", "favorites", null)
        .then((response) => {
          dispatch(getAllFav(response.favorites));

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [location]);

  const handleRemove = (item) => {
    console.log(item);

    handleAPIRequest("get", `favorites/remove/${item.id}`, null)
      .then((response) => {
        dispatch(getAllFav(response.favorites));
        setShowToast({
          ...showToast,
          toggle: true,
          status: "info",
          message: "This item has been removed",
          lable: "Removed as Favorites",
        });

        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
          });
        }, 2000);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div className="flex main-container  overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Favorites</div>
        </div>
        {loading ? (
          <div className="grid animate-pulse  grid-cols-2 justify-between w-full pt-10 h-[114px] gap-9 flex-wrap">
            {" "}
            <div class="rounded-xl bg-slate-200 h-24 w-full"></div>
            <div class="rounded-xl bg-slate-200 h-24 w-full"></div>
          </div>
        ) : (
          <div className="flex justify-between w-full py-10 gap-9 flex-wrap">
            {favourities.length > 0 ? (
              <div className="flex flex-col  md:grid md:grid-cols-2  md:flex-row w-full gap-4 ">
                {favourities.map((item, index) => (
                  <>
                    <Link
                      className="w-full hover-shadow rounded-xl border transition-all ease-in-out duration-400"
                      to={`/profile-details?${item?.uuid}`}
                    >
                      <div className=" flex flex-row justify-between  h-fit w-full p-4   ">
                        {" "}
                        <div className="flex items-center w-full gap-4">
                          <div className=" !rounded-full overflow-hidden w-20 h-20">
                            {item.photo_url != null ? (
                              <img src={item.photo_url} />
                            ) : (
                              <img src={User} />
                            )}
                            {/* <GoPrimitiveDot className='online-icon'/> */}
                          </div>
                          <div className="">
                            <p className="font-bold text-xl">
                              {item.firstname} {item.lastname}
                            </p>
                            <p className="">{item.email}</p>
                          </div>
                        </div>
                        <div
                          onClick={(event) => {
                            event.preventDefault(); // This prevents the default behavior
                            handleRemove(item);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            ) : (
              <div className="flex w-full justify-center center flex-col items-center gap-5 border p-12 bg-slate-50 rounded-md mt-8">
                <img src={emptyState} className="w-28 bg-transparent" />
                <div className="text-3xl ">Your Favorites will appear here</div>
              </div>
            )}
          </div>
        )}
      </div>
      <Toast setShowToast={setShowToast} showToast={showToast} />
    </div>
  );
};

export default Favouraties;
