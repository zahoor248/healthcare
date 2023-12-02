import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./Chat.css";
import { BiSearchAlt } from "react-icons/bi";
import { BiPhotoAlbum } from "react-icons/bi";
import user1 from "../../assets/images/chat1.jpg";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import uuid from "react-uuid";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CommonPrimaryButton from "../CommonPrimaryButton";
export default function Chat() {
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
      });

      getUserDataForChat();
    }
  }, [selectedItem]);
  function ChatMessage(props) {
    const { text, user } = props.message;

    const messageClass = user._id === userLogin.uuid ? "sent" : "received";

    return (
      <div className={`message ${messageClass}`}>
        <img src={user.avatar} alt="" className="circle-img" />
        <p className="text messageBubble">
          <b className="nameTag">{`${user.name} Says:`}</b>
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
      </div>
    );
  }
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

  // useEffect(() => {
  //   getUserDataForChat();
  // }, []);

  const handleClick = () => {
    fileInputRef.current.click();
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
    <div className="flex h-[calc(100vh-147px)] md:h-[calc(100vh-148px)]  xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-202px)] w-full">
      <div className="flex-col w-full max-w-[450px] flex">
        <div className="flex justify-between w-full p-4 bg-neutral-100 py-5">
          <h4>All Conversations ({historyArray.length}) </h4>
          <BiSearchAlt className="search-message" />
        </div>

        <div className="">
          {historyArray.map((item, key) => (
            <div
              className="flex py-6 border-b"
              onClick={() => {
                setChatId(item.chatId);
                setSelectedItem(item);
              }}
            >
              <div className="flex px-4 justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  <div className=" !rounded-full overflow-hidden w-20 h-20">
                    <img
                      src={item.user.photo_url ? item.user.photo_url : user1}
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

      <div className=" border-l w-full">
        {selectedItem && (
          <div className="py-5 px-8 bg-neutral-100">
            {/* <h3><GoPrimitiveDot className='user-online'/>Isabella</h3> */}
            <p className="font-bold text-xl">
              {`${selectedItem.user.firstname} ${selectedItem.user.lastname}`}
            </p>
          </div>
        )}

        <div className="w-full h-full flex justify-end overflow-auto flex-col">
          {selectedItem && (
            <>
              <div className="overflow-auto mb-8">
                {messages.map((item, index) => (
                  <ChatMessage key={index} message={item} />
                ))}
              </div>

              <div className=" mx-[100px] ms-auto mb-20 w-full">
                <div className="px-7 flex flex-row justify-end  gap-2 items-end">
                  {dataURI ? (
                    <div className="w-full border h-[100px] shadow-sm p-2">
                      <button onClick={() => setDataURI(null)}>&#x2715;</button>
                      <img
                        src={dataURI}
                        alt="Selected"
                        style={{ maxWidth: "100%", maxHeight: "100px" }}
                      />
                    </div>
                  ) : (
                    <input
                      className="w-full border   outline-[#0f75bc] !outline-[1px] shadow-sm p-2.5"
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
                      onClick={onSend}
                      loading={false}
                      text={"Send"}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
