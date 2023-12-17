// import React from 'react';
// import "./ImageUpload.css";
// import ImageUploading from 'react-images-uploading';

// export function ImageUpload() {
//   const [images, setImages] = React.useState([]);
//   const maxNumber = 69;

//   const onChange = (imageList, addUpdateIndex) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex);
//     setImages(imageList);
//   };

//   return (
//     <div className="App upload-btn-container">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//       >
//         {({
//           imageList,
//           onImageUpload,
//           onImageRemoveAll,
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           // write your building UI
//           <div className="upload__image-wrapper">
//             <button
//             className='upload-btn'
//               style={isDragging ? { color: 'red' } : undefined}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               +
//             </button>
//             &nbsp;
//             {imageList.map((image, index) => (
//               <div key={index} className="image-item-business">
//                 <div style={{position:"relative"}}>
//                 <img className='business-logo' src={image['data_url']} alt="" width="100" />
//                 <div className="image-item__btn-wrapper remove-img">
//                   <button className='del-img-btn' onClick={() => onImageRemove(index)}>x</button>
//                 </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// }