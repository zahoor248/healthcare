import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./Chat.css";
import { BiSearchAlt } from "react-icons/bi";
import { BiPhotoAlbum } from "react-icons/bi";
import user1 from "../../assets/images/chat1.jpg";
import User from "../../assets/images/holderpic.jpeg";

import { useSelector } from "react-redux";
// import { db } from "../../firebase";
import {
  getFirestore,
  serverTimestamp,
  addDoc,
  doc,
  collection,
  query,
  where,
  limit,
  getDocs,
  orderBy,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import uuid from "react-uuid";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import CommonPrimaryButton from "../CommonPrimaryButton";
import { sendMessageNotification } from "../../helper/SendMessage";

const firebase = require("firebase");
export default function Chat() {
  const [historyArray, setHistoryArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);

  const [image, setImage] = useState(null);

  const [meUser, setMeUser] = useState(null);
  const [getUser, setGetUser] = useState(null);
  const [text, setText] = useState("");

  const userLogin = useSelector((state) => state.user);
  const [chatId, setChatId] = useState("");

  const [dataURI, setDataURI] = useState(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedItem) {
        console.log("Called");

        const db = getFirestore();
        const messageRef = query(
          collection(db, "Chats", selectedItem.chatId, "messages"),
          orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(messageRef, (querySnap) => {
          const allmsg = querySnap.docs.map((docSnap) => {
            const data = docSnap.data();

            return {
              ...data,
              createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            };
          });

          console.log(allmsg, "testingfarazsyed");
          setMessages(allmsg);
        });

        // Cleanup function to unsubscribe when the component unmounts or when selectedItem changes.
        return () => {
          unsubscribe();
        };
      }
    };

    fetchMessages();
  }, [selectedItem, setMessages]);
  // useEffect(() => {
  //   if (selectedItem) {
  //     console.log("Called");
  //     const messageRef = db
  //       .collection("Chats")
  //       .doc(selectedItem.chatId)
  //       .collection("messages")
  //       .orderBy("createdAt", "asc");

  //     messageRef.onSnapshot((querySnap) => {
  //       const allmsg = querySnap.docs.map((docSanp) => {
  //         const data = docSanp.data();

  //         if (data.createdAt) {
  //           return {
  //             ...docSanp.data(),
  //             createdAt: docSanp.data().createdAt.toDate(),
  //           };
  //         } else {
  //           return {
  //             ...docSanp.data(),
  //             createdAt: new Date(),
  //           };
  //         }
  //       });

  //       console.log(allmsg, "testingfarazsyed");
  //       setMessages(allmsg);
  //     });
  //   }
  // }, [selectedItem]);

  function ChatMessage(props) {
    const { text, user, createdAt } = props.message;

    const dateObject = new Date(createdAt);
    const simpleTime = dateObject.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    const messageClass = user._id === userLogin.uuid ? "sent" : "received";

    return (
      <div className={`message ${messageClass}`}>
        <img src={user.avatar} alt="" className="circle-img rounded-full" />
        <p className="text messageBubble">
          {text ? (
            text
          ) : (
            <img
              src={props.message.image}
              style={{ height: 200, width: 200 }}
            />
          )}
          <br />{" "}
          <b
            className="time"
            style={{ color: user._id === userLogin.uuid ? "#ffffff" : "gray" }}
          >
            {simpleTime}
          </b>
        </p>
      </div>
    );
  }

  const getUserChats = async () => {
    let userId = userLogin.uuid;

    try {
      const userChats = [];
      const db = getFirestore();
      const userChatsRef = collection(db, "Chats");

      const user1ChatsQuery = query(
        userChatsRef,
        where("userId1", "==", userId)
      );
      const user2ChatsQuery = query(
        userChatsRef,
        where("userId2", "==", userId)
      );

      const [user1ChatsSnapshot, user2ChatsSnapshot] = await Promise.all([
        getDocs(user1ChatsQuery),
        getDocs(user2ChatsQuery),
      ]);

      const allChatsSnapshot = [
        ...user1ChatsSnapshot.docs,
        ...user2ChatsSnapshot.docs,
      ];

      for (const chatDoc of allChatsSnapshot) {
        const users = chatDoc.data().users;

        const imNotUser = users.filter((i) => i.uuid !== userId);
        const chatId = chatDoc.id;
        const messagesRef = collection(db, "Chats", chatId, "messages");

        const lastMessageQuery = query(
          messagesRef,
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const lastMessageSnapshot = await getDocs(lastMessageQuery);

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

      console.log(userChats, "testing");
      setHistoryArray(userChats);

      if (location.state && location.state.chatId) {
        const response2 = await handleAPIRequest(
          "get",
          `userChat/${location.state.userId}`,
          null
        );

        console.log(response2, "testing");

        if (response2) {
          let newUser = {
            chatId: location.state.chatId,
            messageText: "Type your message",
            time: new Date().toLocaleDateString(), // Set time to the current JavaScript date and time
            user: response2,
          };

          setHistoryArray((prevHistory) => {
            const newUserExists = prevHistory.some(
              (item) => item.user.uuid === newUser.user.uuid
            );

            if (!newUserExists) {
              return [newUser, ...prevHistory];
            }

            return prevHistory;
          });

          console.log("Check", newUser);

          setSelectedItem(newUser);
          setChatId(newUser.chatId);
          setGetUser(response2);
        }
      }
    } catch (error) {
      console.error("Error getting user chats:", error);
    }
  };

  useEffect(() => {
    getUserChats();
  }, []);

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
  const onSend = async (e) => {
    const db = getFirestore();
    e.preventDefault();
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
          `https://app.healthcare-up.com/chat-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!data.isSuccess) {
          return;
        }

        const messagesCollection = collection(
          doc(firestore, "Chats", chatId),
          "messages"
        );

        addDoc(messagesCollection, {
          image: data.url,
          createdAt: new Date(),
          user: {
            _id: userLogin.uuid,
            name: `${userLogin.firstname} ${userLogin.lastname}`,
            avatar: userLogin.photo_url
              ? userLogin.photo_url
              : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
          },
        }).then(() => {
          const chatRef = doc(db, "Chats", chatId);

          setDoc(chatRef, {
            users: [userLogin, getUser],
            userId1: userLogin.uuid,
            userId2: getUser.uuid,
            last_message: {
              text: "photo",
              createdAt: serverTimestamp(),
            },
          });

          sendMessageNotification(
            getUser.fcm_token,
            `${userLogin.firstname} ${userLogin.lastname}`,
            "Image",
            userLogin.uuid,
            chatId,

            userLogin.photo_url
              ? userLogin.photo_url
              : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg"
          );

          setText("");
          setDataURI("");
          setImage("");
        });
      } catch (err) {
        console.log(err);
      } finally {
        setImage(null);
      }

      // Upload the image to Firebase Storage
    } else {
      const messagesCollectionRef = collection(db, "Chats", chatId, "messages");

      addDoc(messagesCollectionRef, {
        text: text,
        createdAt: serverTimestamp(),
        user: {
          _id: message.user._id,
          name: message.user.name,
          avatar: userLogin.photo_url
            ? userLogin.photo_url
            : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg",
        },
      })
        .then(() => {
          const chatRef = doc(db, "Chats", chatId);

          setDoc(chatRef, {
            users: [userLogin, getUser],
            userId1: userLogin.uuid,
            userId2: getUser.uuid,
            createdAt: serverTimestamp(),
          });

          sendMessageNotification(
            getUser.fcm_token,
            `${userLogin.firstname} ${userLogin.lastname}`,
            text,
            userLogin.uuid,
            chatId,

            userLogin.photo_url
              ? userLogin.photo_url
              : "https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg"
          );

          setText("");
          setDataURI("");
          setImage("");

          // Uncomment and add your sendMessageNotification logic here if needed
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="flex bg-neutral-100  pb-2 w-full h-[82vh] md:h-full">
      <div
        className={`${
          !showChat ? "flex  h-[calc(100vh-188px)] bg-neutral-100 md:h-[calc(100vh-180px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)]" : "hidden "
        } md:flex flex-col w-full md:max-w-[450px]`}
      >
        <div className="flex justify-between w-full p-4 bg-neutral-100 py-5">
          <h4>All Conversations ({historyArray.length}) </h4>
        </div>

        <div className=" h-full overflow-auto">
          {historyArray.map((item, key) => (
            <div
              className="flex py-6 border-b"
              onClick={() => {
                setChatId(item.chatId);
                setSelectedItem(item);
                setShowChat(true);

                setGetUser(item.user);
              }}
            >
              <div className="flex px-4 justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <div className=" !rounded-full overflow-hidden  w-20 h-20">
                    <img
                      src={item.user.photo_url ? item.user.photo_url : User}
                    />
                    {/* <GoPrimitiveDot className='online-icon'/> */}
                  </div>
                  <div className="">
                    <p className="font-bold text-xl">
                      {`${item.user.firstname} ${item.user.lastname}`}
                    </p>

                    {item.messageText ? (
                      <p className="">{item.messageText}</p>
                    ) : (
                      <BiPhotoAlbum />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 w-auto">
                  <p className="">{item.time}</p>
                  {/* <p className="bg-blue-400 px-2 w-fit items-end rounded-xl text-white">
                    {item.time}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${showChat ? "block relative h-[calc(100vh-172px)] md:h-[calc(100vh-180px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)]" : "hidden"} md:block border-l w-full`}
      >
        {selectedItem && (
          <div className="py-5 px-8 bg-slate-50">
            {/* <h3><GoPrimitiveDot className='user-online'/>Isabella</h3> */}

            <div
              className="text-neutral-600 flex items-center mr-3 md:hidden"
              onClick={() => setShowChat(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </div>
            <p className="font-bold text-xl">
              {`${selectedItem.user.firstname} ${selectedItem.user.lastname}`}
            </p>
          </div>
        )}

        <div className="w-full h-[90%] flex justify-end overflow-auto flex-col">
          {selectedItem && (
            <>
              <div className="max-h-[80%]">
                {messages.map((item, index) => (
                  <ChatMessage key={index} message={item} />
                ))}
                <div className="h-14"></div>
              </div>

              <div className=" mx-[100px] ms-auto bg-neutral-100 py-3 absolute w-full">
                <form
                  onSubmit={(e) => onSend(e)}
                  className="px-7 flex flex-row justify-end  gap-2 items-end"
                >
                  {dataURI ? (
                    <div className="w-full relative border  shadow-sm p-2">
                      <button
                        className=" relative border rounded-full p-1 mb-1"
                        onClick={() => setDataURI(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#5c5c5c"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-x"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                      <div className="h-20 w-20">
                        <img
                          src={dataURI}
                          alt="Selected"
                          className=" h-20 w-20 object-cover bg-neutral-100 border border-neutral-300 rounded-xl"
                          style={{ maxWidth: "200px", Height: "100px" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <input
                      className="w-full border rounded-full text-sm pl-5 outline-[#0f75bc] !outline-[1px] shadow-sm p-2.5 py-3"
                      value={text}
                      placeholder="Start Writing Here..."
                      resize={"none"}
                      onChange={(e) => setText(e.target.value)}
                    />
                  )}

                  <div className="items-center flex gap-4">
                    <div className="relative w-7 cursor-pointer">
                      <input
                        type="file"
                        className="absolute w-7  top-0 opacity-0"
                        ref={fileInputRef}
                        style={{ display: "" }}
                        onChange={handleChange}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-upload"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                    </div>
                    <CommonPrimaryButton
                      onClick={(e) => onSend(e)}
                      loading={false}
                      text={"Send"}
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
