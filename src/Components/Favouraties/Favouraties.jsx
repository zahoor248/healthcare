import React from "react";
import user1 from "../../assets/images/chat1.jpg";

const Favouraties = () => {
  const favourities = [
    {
      id: 1,
      name: "Alex",
      user_avatar: user1,
      description: "Hi there I am available",
    },

    {
      id: 1,
      name: "Puton",
      user_avatar: user1,
      description: "Hi there I am available",
    },
    {
      id: 1,
      name: "Patric",
      user_avatar: user1,
      description: "Hi there I am available",
    },
  ];

  
  return (
    <div className="flex main-container h-[calc(100vh-202px)] w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">Favouraties</div>
        </div>
        <div className="grid grid-cols-2 justify-between w-full py-14 gap-9 flex-wrap">
          {favourities.map((item, index) => (
            <div className="border h-fit w-full p-4 hover:shadow-sm  rounded-xl">
              {" "}
              <div className="flex items-center gap-4">
                <div className=" !rounded-full overflow-hidden w-20 h-20">
                  <img src={item.user_avatar} />
                  {/* <GoPrimitiveDot className='online-icon'/> */}
                </div>
                <div className="">
                  <p className="font-bold text-xl">{item.name}</p>
                  <p className="">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favouraties;
