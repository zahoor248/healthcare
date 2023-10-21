import React from "react";
import user1 from "../../assets/images/chat1.jpg";

const Favouraties = () => {
  return (
    <div className="flex main-container h-[calc(100vh-202px)] w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Favouraties</div>
        </div>
        <div className="flex justify-between w-full py-14 gap-9">
          <div className="border h-fit w-full p-4 hover:shadow-sm  rounded-xl">
            {" "}
            <div className="flex items-center gap-4">
              <div className=" !rounded-full overflow-hidden w-20 h-20">
                <img src={user1} />
                {/* <GoPrimitiveDot className='online-icon'/> */}
              </div>
              <div className="">
                <p className="font-bold text-xl">test</p>
                <p className="">834578</p>
              </div>
            </div>
          </div>
          <div className="border h-fit w-full p-4 hover:shadow-sm  rounded-xl">
            {" "}
            <div className="flex items-center gap-4">
              <div className=" !rounded-full overflow-hidden w-20 h-20">
                <img src={user1} />
                {/* <GoPrimitiveDot className='online-icon'/> */}
              </div>
              <div className="">
                <p className="font-bold text-xl">test</p>
                <p className="">834578</p>
              </div>
            </div>
          </div><div className="border h-fit w-full p-4 hover:shadow-sm  rounded-xl">
            {" "}
            <div className="flex items-center gap-4">
              <div className=" !rounded-full overflow-hidden w-20 h-20">
                <img src={user1} />
                {/* <GoPrimitiveDot className='online-icon'/> */}
              </div>
              <div className="">
                <p className="font-bold text-xl">test</p>
                <p className="">834578</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favouraties;
