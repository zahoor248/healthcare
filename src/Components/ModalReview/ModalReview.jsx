import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./ModalReview.css";

export default function ModalReview({reviewData}) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-neutral-700 text-lg mt-6 pb-3">Reviews:</h3>

      <div className="w-full">
        <div className="w-full bg-white rounded-xl review-shadow ">
          <div  className="p-4 ">
          
            <div className="flex items-start gap-4">
              <img
                src={require("../../assets/images/avatar.png")}
                width={35}
                height={32}
                className="rounded-full object-cover w-10 h-10 "
                alt="User Image"
              />

              <div className="flex flex-col">
                <p className="modal-user-review">Alex Martinez</p>
                <div style={{ marginTop: ".3rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F3E5AB"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='modal-slide1'>
                  <div style={{display:"flex"}}>
                  <div className='slide-image-container'></div>
                  <div style={{marginLeft:"1.2rem", marginTop:"0.2rem"}}>
                      <p className='modal-user-review'>Alex Martinez</p>
                      <div style={{marginTop:".3rem"}}> 
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      </div>
                  </div>
                  </div>
              </div>
  
              <div className='modal-slide1'>
                  <div style={{display:"flex"}}>
                  <div className='slide-image-container'></div>
                  <div style={{marginLeft:"1.2rem", marginTop:"0.2rem"}}>
                      <p className='modal-user-review'>Alex Martinez</p>
                      <div style={{marginTop:".3rem"}}> 
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      </div>
                  </div>
                  </div>
              </div>

            <div className='modal-slide1'>
                  <div style={{display:"flex"}}>
                  <div className='slide-image-container'></div>
                  <div style={{marginLeft:"1.2rem", marginTop:"0.2rem"}}>
                      <p className='modal-user-review'>Alex Martinez</p>
                      <div style={{marginTop:".3rem"}}> 
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      </div>
                  </div>
                  </div>
              </div>
  
  
              <div className='modal-slide1'>
                  <div style={{display:"flex"}}>
                  <div className='slide-image-container'></div>
                  <div style={{marginLeft:"1.2rem", marginTop:"0.2rem"}}>
                      <p className='modal-user-review'>Alex Martinez</p>
                      <div style={{marginTop:".3rem"}}> 
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      </div>
                  </div>
                  </div>
              </div>
  
              <div className='modal-slide1'>
                  <div style={{display:"flex"}}>
                  <div className='slide-image-container'></div>
                  <div style={{marginLeft:"1.2rem", marginTop:"0.2rem"}}>
                      <p className='modal-user-review'>Alex Martinez</p>
                      <div style={{marginTop:".3rem"}}> 
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      </div>
                  </div>
                  </div>
              </div>
              
              <div className='modal-slide1'>
                  <div style={{display:"flex"}}>
                  <div className='slide-image-container'></div>
                  <div style={{marginLeft:"1.2rem", marginTop:"0.2rem"}}>
                      <p className='modal-user-review'>Alex Martinez</p>
                      <div style={{marginTop:".3rem"}}> 
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      <AiFillStar className='review-stars'/>
                      </div>
                  </div>
                  </div>
              </div> */}
      </div>
    </div>
  );
}
