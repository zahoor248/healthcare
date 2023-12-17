import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSearchAlt } from "react-icons/bi";
import { BiPhotoAlbum } from "react-icons/bi";
import user1 from "../../assets/images/chat1.jpg";
import firebase from "firebase";
import { db } from "../../firebase";
import uuid from "react-uuid";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CommonPrimaryButton from "../CommonPrimaryButton";
const ChatBox = ({ reset }) => {
  let chatHistory = [];
  let count = 2;
  let { chatValsEmpty } = [];
  let user = [];
  const [copied, setCopied] = useState("");
  const [disabledQuestion, setDisabledQuestion] = useState(false);
  const [chatData, setChatData] = useState([]);
  const dispatch = useDispatch();
  const scrollDown = useRef();
  const [botMessage, setBotMessage] = useState([]);
  let [val, setVal] = useState([]);
  useEffect(() => {
    scrollDown.current?.scrollIntoView({ behavior: "smooth" });
  });
  // time formate
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
      (hours > 9 ? hours : `0${hours}`) + ":" + minutes + " " + ampm;
    return strTime;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabledQuestion(true);
    // Human message and api call
    const { value } = e.target[0];
    if (value == "") {
      setDisabledQuestion(false);
    }
    if (value) {
      let _chatData = [...botMessage];
      let temp = {
        id: chatData.length == 0 ? 0 : chatData.length + 1,
        messageText: value,
        messageTime: formatAMPM(new Date()),
        key: "human",
      };
      _chatData.push(temp);
      setBotMessage((pre) => [...pre, { ...temp }]);
      setChatData(_chatData);
      setDisabledQuestion(false);

      let payloadQuestion = {
        question: value,
        userId: user?.id,
        type: "text",
      };
    }

    let reset = document.getElementById("input");
    reset.value = "";
    if (typeof window !== "undefined" && window) {
      let element = document.getElementById("one");
      !reset &&
        setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 0);
      let chabox = document.getElementById("new");
      setTimeout(() => {
        if (chabox.scroll) {
          chabox.scrollTop = chabox.scrollHeight;
        }
      }, 10);
    }
  };

  useEffect(() => {
    setChatData(botMessage);
  }, [botMessage]);

  useEffect(() => {
    if (chatValsEmpty === "emptyStartChat") {
      //   dispatch(setChatData([]));
      setBotMessage([]);
    }
  }, [chatValsEmpty]);

  const [historyArray, setHistoryArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  const [image, setImage] = useState(null);

  const [meUser, setMeUser] = useState(null);
  const [getUser, setGetUser] = useState(null);
  const [text, setText] = useState("");

  const userLogin = useSelector((state) => state.user);
  const [chatId, setChatId] = useState("");

  const [dataURI, setDataURI] = useState(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    if (selectedItem) {
      console.log(selectedItem);
      const messageRef = db
        .collection("Chats")
        .doc(selectedItem.chatId)
        .collection("messages")
        .orderBy("createdAt", "asc");

      messageRef.onSnapshot((querySnap) => {
        const allmsg = querySnap.docs.map((docSanp) => {
          const data = docSanp.data();

          if (data.createdAt) {
            return {
              ...docSanp.data(),
              createdAt: docSanp.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSanp.data(),
              createdAt: new Date(),
            };
          }
        });

        setMessages(allmsg);
        console.log(messages, 'here ie eidwqkjbdsiohewf efihofewiefwi')
      });

      getUserDataForChat();
    }
  }, [selectedItem]);
  const ChatMessage = ({ msg }) => {
    const messageClass = msg._id === userLogin.uuid ? "sent" : "received";

    return messageClass;
  };
  const getUserChats = async () => {
    db.collection("Chats").onSnapshot(async (chatsSnapshot) => {
      const userChats = [];

      for (const chatDoc of chatsSnapshot.docs) {
        const users = chatDoc.data().users;

        const imNotUser = users.filter((i) => i.uuid !== userLogin.uuid);
        const hasUser = users.some((u) => u.uuid === userLogin.uuid);

        if (hasUser) {
          const chatId = chatDoc.id;
          const messagesRef = db
            .collection("Chats")
            .doc(chatId)
            .collection("messages");

          const lastMessageQuery = messagesRef
            .orderBy("createdAt", "desc")
            .limit(1);

          const lastMessageSnapshot = await lastMessageQuery.get();

          const userChat = {
            chatId,
            user: imNotUser[0],
            messageText: "",
            time: "",
          };

          lastMessageSnapshot.forEach((lastMessageDoc) => {
            const messageData = lastMessageDoc.data();

            const timestamp = messageData.createdAt;
            const date = timestamp.toDate();
            const currentDate = new Date();

            const isToday =
              date.getDate() === currentDate.getDate() &&
              date.getMonth() === currentDate.getMonth() &&
              date.getFullYear() === currentDate.getFullYear();

            const isYesterday =
              date.getDate() === currentDate.getDate() - 1 &&
              date.getMonth() === currentDate.getMonth() &&
              date.getFullYear() === currentDate.getFullYear();

            let formattedDateTime;

            if (isToday) {
              formattedDateTime = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
            } else if (isYesterday) {
              formattedDateTime = "Yesterday";
            } else {
              formattedDateTime = date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
              });
            }

            userChat.messageText = messageData.text;
            userChat.time = formattedDateTime;
          });

          userChats.push(userChat);
        }
      }

      console.log(historyArray, "TestingHistory");
      setHistoryArray(userChats);
    });
  };

  useEffect(() => {
    if (location.hash) {
      let chatIdhas = location.hash.split("#");

      if (!isNaN(chatIdhas[1])) {
        setChatId(chatIdhas[1]);
      } else {
        console.log(JSON.parse(chatIdhas[1]));
      }
    }
    getUserChats();
  }, []);

  const getUserDataForChat = () => {
    let user_uuid = "";
    if (location.search) {
      user_uuid = location.search.split("=")[1];
    } else {
      user_uuid = selectedItem.user.uuid;
    }

    handleAPIRequest("get", `userChat/${user_uuid}`, null)
      .then((response) => {
        handleAPIRequest("get", `userChat/${userLogin.uuid}`, null).then(
          (response2) => {
            if (response2) {
              setMeUser(response2);
            }
          }
        );
        if (response) {
          setGetUser(response);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      // Display the selected image as a data URI in the textarea
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataURI(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const onSend = async () => {
    const token = localStorage.getItem("token");

    const message = {
      _id: uuid(),
      text: text,
      user: {
        _id: userLogin.uuid,
        avatar:
          "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
        name: `${userLogin.firstname} ${userLogin.lastname}`,
      },

      createdAt: new Date(),
    };

    if (image) {
      // Extract file extension and type
      const ext = image.name.split(".").pop();
      const type = `image/${ext}`;

      // Create FormData for image upload
      const formData = new FormData();
      formData.append("image", image, `image.${ext}`);

      try {
        const { data } = await axios.post(
          `https://app.healthcare-up.com/api/v1/chat-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!data.isSuccess) {
          return;
        }

        db.collection("Chats")
          .doc(chatId)
          .collection("messages")
          .add({
            image: data.url,
            createdAt: new Date(),

            user: {
              _id: userLogin.uuid,
              name: `${meUser.firstname} ${meUser.lastname}`,

              avatar: meUser.photo_url
                ? meUser.photo_url
                : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
            },
          })
          .then(() => {
            db.collection("Chats")
              .doc(chatId)
              .set({
                users: [meUser, getUser],

                last_message: {
                  text: "photo",
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                },
              });

            setText("");
            setDataURI("");
            setImage("");

            // sendMessageNotification(
            //   getUser.fcm_token,
            //   `${meUser.firstname} ${meUser.lastname}`,
            //   "Image",
            //   meUser.uuid,
            //   chatId,

            //   meUser.photo_url
            //     ? meUser.photo_url
            //     : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg"
            // );
          });
      } catch (err) {
        console.log(err);
      } finally {
        setImage(null);
      }

      // Upload the image to Firebase Storage
    } else {
      db.collection("Chats")
        .doc(chatId)
        .collection("messages")
        .add({
          text: text,
          createdAt: firebase.firestore.Timestamp.fromDate(message.createdAt),

          user: {
            _id: message.user._id,
            name: message.user.name,
            avatar: meUser.photo_url
              ? meUser.photo_url
              : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
          },
        })
        .then(() => {
          db.collection("Chats")
            .doc(chatId)
            .set({
              users: [meUser, getUser],

              last_message: {
                text: text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
            });

          // sendMessageNotification(
          //   getUser.fcm_token,
          //   `${meUser.firstname} ${meUser.lastname}`,
          //   text,
          //   meUser.uuid,
          //   chatId,

          //   meUser.photo_url
          //     ? meUser.photo_url
          //     : 'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
          // );
        })

        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div class="flex">
      <div>
        {historyArray.map((item, key) => (
          <div
            class="flex py-6 border-b"
            onClick={() => {
              setChatId(item.chatId);
              setSelectedItem(item);
            }}
          >
            <div class="flex px-4 justify-between items-center w-full">
              <div class="flex items-center gap-4">
                <div class=" !rounded-full overflow-hidden w-20 h-20">
                  <img
                    src={item.user.photo_url ? item.user.photo_url : user1}
                  />
                  {/* <GoPrimitiveDot class='online-icon'/> */}
                </div>
                <div class="">
                  <p class="font-bold text-xl">
                    {`${item.user.firstname} ${item.user.lastname}`}
                  </p>

                  {item.messageText ? (
                    <p class="">{item.messageText}</p>
                  ) : (
                    <BiPhotoAlbum />
                  )}
                </div>
              </div>
              <div class="flex flex-col items-end gap-1 w-auto">
                <p class="">{item.time}</p>
                {/* <p class="bg-blue-400 px-2 w-fit items-end rounded-xl text-white">
                    {item.time}
                  </p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        id="new"
        ref={scrollDown}
        class={`flex  flex-col justify-between items-center  w-full 
     h-[100vh]  lg:h-[calc(100vh-202px)] mx-auto relative container main-container`}
      >
        <div
          ref={scrollDown}
          class={`
                     w-full h-full`}
        >
          <div
            class={`flex  flex-col items-start justify-end space-x-2 container w-full max-w-[758px] m-auto !mb-12 ${"lg:mt-8 mt-12"} ${
              messages.length == 0 && "h-full"
            }`}
          >
            {messages.length == 0 && (
              <div class="w-full h-full flex justify-center items-center relative m-auto">
                <div class="flex items-center flex-col gap-3">
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="84"
                      height="84"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-message-circle"
                    >
                      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    </svg>
                  </div>
                  <div class="lg:text-xl text-neutral-500 font-bold text-base">
                    {" "}
                    Awesome! Start Conversation.{" "}
                  </div>
                </div>
              </div>
            )}
            {/* <div class={`message ${messageClass}`}>
              <img src={user.avatar} alt="" class="circle-img" />
              <p class="text messageBubble">
                <b class="nameTag">{`${user.name} Says:`}</b>
                <br />{" "}
                {text ? (
                  text
                ) : (
                  <img
                    src={props.message.image}
                    style={{ height: 200, width: 200 }}
                  />
                )}
              </p>
            </div> */}
            {messages?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  ref={scrollDown}
                  class="flex justify-between w-full "
                >
                  {item.id != userLogin.uuid ? (
                    <>
                      <div
                        ref={scrollDown}
                        key={idx}
                        class={`flex flex-col justify-end w-full `}
                      >
                        <div class="flex flex-col space-y-4 w-full ">
                          <div class="flex items-center rounded-xl rounded-tr-none w-fit self-end">
                            <div class="bg-primary text-white overflow-auto rounded-xl rounded-tr-none px-4 py-3 w-fit self-end mx-2 my-4">
                              {/* {messages.map((item, index) => (
                                <ChatMessage key={index} message={item} />
                              ))} */}
                              {item.text}
                            </div>
                            <img
                              class="rounded-full w-12 h-12"
                              src={user.avatar}
                              alt={"user"}
                            />
                          </div>
                        </div>

                        <div class="flex justify-end items-center px-4">
                          <p class="text-sm leading-normal text-neutral-600 figtree-font">
                            {item?.messageTime}
                          </p>
                          <div class="flex space-x-1 h-4.5"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      key={idx}
                      ref={scrollDown}
                      class="flex flex-col space-y-4 mb-4 "
                    >
                      <img
                        src={item?.message?.image}
                        style={{ height: 200, width: 200 }}
                      />
                      {/* <div class="bg-neutral-100 rounded-xl rounded-tl-none p-4 ">
                                                {item?.messageText}
                                            </div> */}
                      <div class="bg-neutral-100 rounded-xl rounded-tl-none p-4 ">
                        <h1 class="figtree-font break-words ">{item.text}</h1>
                      </div>
                      {/* {!messageLoader && ( */}
                      <div class="flex justify-between items-center px-4 ">
                        <p class="text-sm leading-normal text-neutral-600  figtree-font">
                          {item?.messageTime}
                        </p>
                        <div
                          onClick={() => {
                            setCopied(item?.id);
                            setTimeout(() => {
                              setCopied("");
                            }, 1000);
                            navigator.clipboard.writeText(item?.messageText);
                          }}
                          class="flex  space-x-1 cursor-pointer"
                        >
                          <img
                            src={"/icons/copy_icon.svg"}
                            alt={"copy text"}
                            width={20}
                            height={20}
                          />
                          <p class="text-sm leading-normal text-neutral-600 figtree-font">
                            {copied == item.id ? "Copied" : "Copy"}
                          </p>
                        </div>
                      </div>
                      {/* )} */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <form
          class={`flex space-x-2 max-w-[758px] bg-white w-full ${
            reset
              ? "fixed px-4 xs:!-bottom-5 lg:!-bottom-10 bg-slate-50"
              : "fixed lg:px-0 px-4"
          }  bottom-28 `}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div
            class={`${
              disabledQuestion && `opacity-70`
            } w-[100%] flex justify-center items-center `}
          >
            <input
              disabled={disabledQuestion}
              id="input"
              type={"text"}
              placeholder={"Type your message here"}
              class={
                "w-full px-4 py-3.5 border hover:border-neutral-400  border-primary-300 focus:outline-primary text-sm leading-normal placeholder-neutral-500 "
              }
            />
          </div>
          <button
            disabled={disabledQuestion}
            type="submit"
            class={`${
              disabledQuestion && `opacity-70`
            } text-base font-semibold figtree-font bg-primary hover:bg-primary/80 text-white p-1.5`}
          >
            <svg
              width={34}
              height={34}
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7209 14.0841C11.7803 15.5008 10.9331 16.9104 10.4132 17.8312L9.10985 16.4755C8.29672 15.6175 8.29672 14.2734 9.10985 13.4155C9.49421 13.0125 10.0263 12.7838 10.5832 12.7822H13.6177C13.3159 13.2058 13.0128 13.645 12.7209 14.0841Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.9121 21.2752C18.4955 22.2158 17.0859 23.063 16.165 23.5829L17.5194 24.8877C18.3773 25.7008 19.7214 25.7008 20.5794 24.8877C20.9823 24.5033 21.211 23.9712 21.2126 23.4143V20.3784C20.7905 20.6802 20.3513 20.9833 19.9121 21.2752Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.9426 17.3C10.6493 17.0075 10.1744 17.0082 9.88197 17.3015C9.58951 17.5948 9.59021 18.0697 9.88354 18.3622L10.9426 17.3ZM13.2932 20.7027L13.824 20.1728L13.8227 20.1715L13.2932 20.7027ZM15.6353 24.1111C15.9279 24.4043 16.4028 24.4048 16.696 24.1122C16.9892 23.8196 16.9896 23.3447 16.697 23.0515L15.6353 24.1111ZM12.9942 12.3615C12.7627 12.7051 12.8536 13.1712 13.1971 13.4026C13.5406 13.6341 14.0067 13.5433 14.2381 13.1998L12.9942 12.3615ZM16.1492 9.81982L15.67 9.24281C15.6594 9.25165 15.649 9.2608 15.6388 9.27022L16.1492 9.81982ZM25.3745 8.62698L26.1208 8.55254C26.0853 8.19633 25.803 7.91489 25.4466 7.88046L25.3745 8.62698ZM24.1817 17.8523L24.73 18.364C24.7399 18.3535 24.7494 18.3426 24.7587 18.3314L24.1817 17.8523ZM20.7963 19.7552C20.4522 19.9857 20.3601 20.4516 20.5907 20.7957C20.8213 21.1398 21.2871 21.2319 21.6312 21.0013L20.7963 19.7552ZM22.3195 12.7356C22.6122 12.4426 22.612 11.9677 22.319 11.6749C22.026 11.3822 21.5511 11.3824 21.2584 11.6754L22.3195 12.7356ZM19.54 13.3952C19.2472 13.6882 19.2474 14.1631 19.5404 14.4559C19.8334 14.7486 20.3083 14.7484 20.6011 14.4554L19.54 13.3952ZM9.88354 18.3622L12.7636 21.2338L13.8227 20.1715L10.9426 17.3L9.88354 18.3622ZM12.7623 21.2325L15.6353 24.1111L16.697 23.0515L13.824 20.1728L12.7623 21.2325ZM14.2381 13.1998C14.9342 12.1667 15.7467 11.217 16.6595 10.3694L15.6388 9.27022C14.6418 10.196 13.7545 11.2332 12.9942 12.3615L14.2381 13.1998ZM16.6283 10.3968C16.961 10.1206 17.4982 9.87837 18.2218 9.69009C18.9335 9.50489 19.7652 9.38701 20.6333 9.32042C22.3697 9.18723 24.1764 9.2647 25.3024 9.37351L25.4466 7.88046C24.2563 7.76543 22.3606 7.68353 20.5185 7.82482C19.5974 7.89547 18.6708 8.0233 17.844 8.23843C17.0291 8.4505 16.2476 8.76325 15.67 9.24281L16.6283 10.3968ZM24.6282 8.70143C24.7403 9.82477 24.8178 11.6308 24.6838 13.3673C24.6167 14.2354 24.4982 15.0672 24.3125 15.7791C24.1237 16.5027 23.8811 17.0403 23.6047 17.3732L24.7587 18.3314C25.2381 17.7541 25.5513 16.9728 25.7639 16.1577C25.9797 15.3309 26.1082 14.4042 26.1793 13.4828C26.3215 11.6405 26.2397 9.74403 26.1208 8.55254L24.6282 8.70143ZM23.6334 17.3406C22.7833 18.2514 21.8313 19.0616 20.7963 19.7552L21.6312 21.0013C22.7617 20.2438 23.8015 19.3589 24.73 18.364L23.6334 17.3406ZM21.2584 11.6754L19.54 13.3952L20.6011 14.4554L22.3195 12.7356L21.2584 11.6754Z"
                fill="#5c5c5c"
              />
            </svg>
          </button>
          <div
            class={`-left-2 absolute -z-10 ${
              reset ? "h-17" : "lg:h-20"
            } w-full lg:chatbox-img `}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
