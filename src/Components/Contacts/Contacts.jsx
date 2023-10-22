
import React from "react";
import user1 from "../../assets/images/chat1.jpg";
import dayjs from "dayjs";
import Fade from "react-reveal/Fade";
const Contacts = () => {
  const favourities = [
    {
      id: 1,
      name: "Alex",
      contract_number: "23",
      contractor_name: "Adam",
      contract_staus: "Open",
      details: "Hello",
      terms_of_service: "Customer",
      price: "10",
      user_avatar: user1,
      description: "Hi there I am available",
      location: "13981 Francisca Drive Suite 203, USA",
      start_date: new Date(),
      end_date: new Date(),
    },
    {
        id: 1,
        name: "Alex",
        contract_number: "23",
        contractor_name: "Adam",
        contract_staus: "Open",
        details: "Hello",
        terms_of_service: "Customer",
        price: "10",
        user_avatar: user1,
        description: "Hi there I am available",
        location: "13981 Francisca Drive Suite 203, USA",
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        id: 1,
        name: "Alex",
        contract_number: "23",
        contractor_name: "Adam",
        contract_staus: "Open",
        details: "Hello",
        terms_of_service: "Customer",
        price: "10",
        user_avatar: user1,
        description: "Hi there I am available",
        location: "13981 Francisca Drive Suite 203, USA",
        start_date: new Date(),
        end_date: new Date(),
      },
      {
        id: 1,
        name: "Alex",
        contract_number: "23",
        contractor_name: "Adam",
        contract_staus: "Open",
        details: "Hello",
        terms_of_service: "Customer",
        price: "10",
        user_avatar: user1,
        description: "Hi there I am available",
        location: "13981 Francisca Drive Suite 203, USA",
        start_date: new Date(),
        end_date: new Date(),
      },
  ];

  return (
    <div className="flex main-container h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] overflow-auto w-full">
      <div className="flex w-full flex-col    py-14">
        <div className=" justify-center items-start text-neutral-700 flex w-full">
          <div className="text-3xl">My Contracts</div>
        </div>
        <div className="grid grid-cols-1 justify-between w-full py-10 gap-9 flex-wrap">
          {favourities.map((item, index) => (
            <div className="border-neutral-900 border h-fit w-full  hover:shadow-sm  rounded-xl">
              {" "}
              <div className="flex justify-startw-full ">
                <div className="flex items-start gap-4 border-r w-[20%] p-8">
                  <div className="">
                    <p className="font-bold text-[#2676BC] text-xl">
                      {" "}
                      Contract#{item.contract_number}
                    </p>
                    <div className="flex gap-3 pt-4">
                      <div className="font-semibold">Status:</div>
                      <p className="">{item.contract_staus}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-col p-8 border-r w-[30%]">
                  <div className="font-semibold">
                    Between:
                    {/* <GoPrimitiveDot className='online-icon'/> */}
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        <img src={item.user_avatar} />
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl">{item.name}</p>
                        <p className="">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className=" !rounded-full overflow-hidden w-14 h-14">
                        <img src={item.user_avatar} />
                        {/* <GoPrimitiveDot className='online-icon'/> */}
                      </div>
                      <div className="">
                        <p className="font-bold text-xl">
                          {item.contractor_name}
                        </p>
                        <p className="">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <di v className="flex items-start gap-4 flex-col p-8 w-[50%]">
                  <div className="">
                    Details:
                    {/* <GoPrimitiveDot className='online-icon'/> */}
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <div className="">
                      <p className="">{item.location}</p>
                    </div>
                    <div className="flex">
                      <p className="">
                        {dayjs(item.start_date).format("DD/MM/YYYY")}
                      </p>
                      <span className="px-2">-</span>
                      <p className="">
                        {dayjs(item.end_date).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div className="font-semibold">100$/ FIxed</div>
                    <p className="">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eaque praesentium id deserunt accusamus!
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold">Additional Terms:</div>
                    <div className="pt-2">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laudantium doloremque fuga minus vero quaerat quia aperiam
                      iste numquam quisquam velit, pariatur repellendus quam
                      nostrum, ipsam tempora modi nulla minima eos.
                    </div>
                  </div>
                </di>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;