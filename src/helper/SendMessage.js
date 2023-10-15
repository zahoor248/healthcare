// import axios from 'axios';
// import {FCM_SERVER, FIREBASE_SERVER_KEY} from '../Api/BaseUrl';

// export const sendMessage = (
//   fcm,
//   title,
//   message,
//   userid,
//   doorid,
//   chatgroupid,
//   emergency,
//   doorname,
// ) => {
//   let data2 = {
//     to: fcm,
//     content_available: true,
//     priority: 'high',
//     notification: {
//       title: title,
//       body: message,
//     },

//     data: {
//       user_id: userid,
//       door_id: doorid,
//       chatgroupid: chatgroupid,
//       emergency: emergency,
//       doorname: doorname,
//     },
//   };
//   var config = {
//     method: 'post',
//     url: FCM_SERVER,
//     headers: {
//       Authorization: FIREBASE_SERVER_KEY,
//       'Content-Type': ' application/json',
//     },
//     data: JSON.stringify(data2),
//   };

//   axios(config)
//     .then(function (response) {})
//     .catch(function (error) {});
// };
