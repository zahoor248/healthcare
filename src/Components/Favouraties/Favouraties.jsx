import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/chat1.jpg";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav } from "../../Store/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";

const Favouraties = () => {
  const [loading, setLoading] = useState(true);
  const favourities = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  useEffect(() => {
    handleAPIRequest("get", "favorites", null)
      .then((response) => {
        console.log(response, "Helelelelelelele");
        dispatch(getAllFav(response.favorites));
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [loading,favourities]);
  return (
    <div className="flex main-container h-[calc(100vh-202px)] overflow-auto w-full">
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
              <div className="border h-fit w-full p-4 hover:shadow-sm  rounded-xl">
                {" "}
                <div className="flex items-center gap-4">
                  <div className=" !rounded-full overflow-hidden w-20 h-20">
                    <img src={item.photo_url} />
                    {/* <GoPrimitiveDot className='online-icon'/> */}
                  </div>
                  <div className="">
                    <p className="font-bold text-xl">
                      {item.firstname} {item.lastname}
                    </p>
                    <p className="">{item.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favouraties;
