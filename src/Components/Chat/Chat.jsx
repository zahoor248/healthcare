import React from "react";
import "./Chat.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import user1 from "../../assets/images/chat1.jpg";
// import { GoPrimitiveDot } from "react-icons/go";
import user2 from "../../assets/images/chat2.jpg";
import prouser from "../../assets/images/prouser.jpg";

export default function Chat() {
  const conversationList = [
    {
      id: 1,
      name: "John Doe",
      user_avtar: user1,
      un_read_msg: 3,
      last_read_msg: "Hi There where are you",
    },
    {
      id: 2,
      name: "Victor Wayne",
      user_avtar: user2,
      un_read_msg: 5,
      last_read_msg: "I am going home",
    },
    {
      id: 3,
      name: "Jane Doe",
      user_avtar: user2,
      un_read_msg: 1,
      last_read_msg: "Lets meet",
    },
  ];
  const chat_msg = [
    {
      id: 1,
      name: "Jane Doe",
      user_avtar: user2,
      un_read_msg: 1,
      last_read_msg: "Lets meet",
    },
    {
      id: 1,
      name: "Jane Doe",
      user_avtar: user2,
      un_read_msg: 1,
      last_read_msg: "Lets meet",
    },
    {
      id: 1,
      name: "Jane Doe",
      user_avtar: user2,
      un_read_msg: 1,
      last_read_msg: "Lets meet",
    },
    {
      id: 1,
      name: "Jane Doe",
      user_avtar: user2,
      un_read_msg: 1,
      last_read_msg: "Lets meet",
    },
    {
      id: 1,
      name: "Jane Doe",
      user_avtar: user2,
      un_read_msg: 1,
      last_read_msg: "Lets meet",
    },
  ];

  return (
    <div className="flex h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] w-full">
      <div className="flex-col w-full max-w-[450px] flex">
        <div className="flex justify-between w-full p-4 bg-neutral-100 py-5">
          <h4>All Conversations (8) </h4>
          <BiSearchAlt className="search-message" />
        </div>

        <div className="">
          {conversationList.map((item, key) => (
            <div className="flex py-6 border-b">
              <div className="flex px-4 justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <div className=" !rounded-full overflow-hidden w-20 h-20">
                    <img src={item.user_avtar} />
                    {/* <GoPrimitiveDot className='online-icon'/> */}
                  </div>
                  <div className="">
                    <p className="font-bold text-xl">{item.name}</p>
                    <p className="">{item.last_read_msg}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 w-auto">
                  <p className="">Just Now</p>
                  <p className="bg-blue-400 px-2 w-fit items-end rounded-xl text-white">
                    {item.un_read_msg}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" border-l w-full">
        <div className="py-5 px-8 bg-neutral-100">
          {/* <h3><GoPrimitiveDot className='user-online'/>Isabella</h3> */}
          <p className="py-[3px] relative">
            <span className="-top-[42px] -left-5 text-green-700 text-7xl absolute">
              .
            </span>{" "}
            Online | Local time 4:25 PM
          </p>
        </div>
        <div className="w-full h-full justify-between flex flex-col">
        <div className="flex flex-col gap-7 pt-8 overflow-auto pb-10">  
          {chat_msg.map((item, index) => (
            <div className="flex px-12">
              <img className="message-user1-image" src={user2} />
              <h5 className="chat-name">
                Isabella{" "}
                <span
                  style={{
                    color: "#888",
                    marginLeft: "1rem",
                    fontSize: "1rem",
                  }}
                >
                  3:51 PM
                </span>
              </h5>
              <p className="message-content">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
                tempora debitis corrupti dolores consectetur ab non
                necessitatibus consequatur perferendis rerum aliquam, laboriosam
                vel!Maiores perspiciatis laudantium asperiores nostrum vel
                aliquam!
              </p>
            </div>
          ))}
          </div>
          <div className=" mx-[100px] ms-auto mb-20 w-full">
            <div className="px-7 flex flex-col justify-end items-end">
              <textarea className="w-full border h-[100px] shadow-sm p-2  " />
              <div className="items-end">
                <button className="px-8 hover:bg-blue-700 transition-all ease-in-out duration-500 rounded-md mt-3 bg-blue-600 text-white py-3">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
}
