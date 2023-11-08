import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/chat1.jpg";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favouraties = () => {
  const [loading, setLoading] = useState(false);
  const favourities = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
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
          console.log(response, "Helelelelelelele");
          dispatch(getAllFav(response.favorites));

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [loading, favourities]);

  const handleRemove = (item) => {
    console.log(item);

    handleAPIRequest("get", `favorites/remove/${item.id}`, null)
      .then((response) => {
        console.log(response, "Helelelelelelele");
        dispatch(getAllFav(response.favorites));

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div className="flex main-container h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Favouraties</div>
        </div>
        {loading ? (
          <div className="grid animate-pulse  grid-cols-2 justify-between w-full pt-10 h-[114px] gap-9 flex-wrap">
            {" "}
            <div class="rounded-xl bg-slate-200 h-full py-10 w-full"></div>
            <div class="rounded-xl bg-slate-200 h-full py-10 w-full"></div>
            <div class="rounded-xl bg-slate-200 h-full py-10 w-full"></div>
            <div class="rounded-xl bg-slate-200 h-full py-10 w-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 justify-between w-full py-10 gap-9 flex-wrap">
            {favourities.map((item, index) => (
              <>
                <Link to={`/profile-details?${item?.uuid}`}>
                  <div className="border flex justify-between h-fit w-full p-4 hover:shadow-sm  rounded-xl">
                    {" "}
                    <div className="flex items-center gap-4">
                      <div className=" !rounded-full overflow-hidden w-20 h-20">
                        {item.photo_url != null ? (
                          <img src={item.photo_url} />
                        ) : (
                          <div className="w-20 h-20 flex justify-center capitalize items-center bg-slate-700 text-xl font-bold text-white">
                            {item?.firstname.charAt(0)}
                          </div>
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
        )}
      </div>
    </div>
  );
};

export default Favouraties;
