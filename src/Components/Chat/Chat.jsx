import React from 'react';
import "./Chat.css";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import user1 from "../../assets/images/chat1.jpg";
import { GoPrimitiveDot } from "react-icons/go";
import user2 from "../../assets/images/chat2.jpg";
import prouser from "../../assets/images/prouser.jpg";

export default function Chat() {
  return (
    <div className='chat-container'>
        <div className='chat-user-section'>
            <div className='conversation-text'>
                <h4>All Conversations (8) <AiFillCaretDown/></h4>
                <BiSearchAlt className='search-message'/>
            </div>  

            <div className='all-user-messages'>
                <div className='message-user1'>
                    <div className='user-image-container'>
                        <img src={user1}/>
                       <GoPrimitiveDot className='online-icon'/>
                    </div>
                    <div className='chat-details'>
                        <div className='chat-desc'>
                            <p className='chat-username'>John</p>
                            <p className='chat-title'>Hello World</p>
                        </div>

                        <div className='time-section'>
                            <p className='chat-time'>Just Now</p>
                            <p className='chat-unread'>2</p>
                        </div>
                    </div>
                </div>

                <div className='message-user2'>
                    <div className='user-image-container'>
                        <img src={user2}/>
                       <GoPrimitiveDot className='online-icon'/>
                    </div>
                    <div className='chat-details'>
                        <div className='chat-desc'>
                            <p className='chat-username'>Isabella</p>
                            <p className='chat-title'>Lorem Ipsum lorem ipsum lorem</p>
                        </div>

                        <div className='time-section'>
                            <p className='chat-time'>Just Now</p>
                            <p className='chat-unread'>5</p>
                        </div>
                    </div>
                </div>

                <div className='message-user1'>
                    <div className='user-image-container'>
                        <img src={user1}/>
                       <GoPrimitiveDot className='online-icon'/>
                    </div>
                    <div className='chat-details'>
                        <div className='chat-desc'>
                            <p className='chat-username'>John</p>
                            <p className='chat-title'>Hello World</p>
                        </div>

                        <div className='time-section'>
                            <p className='chat-time'>Just Now</p>
                            <p className='chat-unread'>2</p>
                        </div>
                    </div>
                </div>

                <div className='message-user1'>
                    <div className='user-image-container'>
                        <img src={user2}/>
                       <GoPrimitiveDot className='online-icon'/>
                    </div>
                    <div className='chat-details'>
                        <div className='chat-desc'>
                            <p className='chat-username'>Isabella</p>
                            <p className='chat-title'>Lorem Ipsum lorem ipsum lorem</p>
                        </div>

                        <div className='time-section'>
                            <p className='chat-time'>Just Now</p>
                            <p className='chat-unread'>5</p>
                        </div>
                    </div>
                </div>

                <div className='message-user1'>
                    <div className='user-image-container'>
                        <img src={user1}/>
                       <GoPrimitiveDot className='online-icon'/>
                    </div>
                    <div className='chat-details'>
                        <div className='chat-desc'>
                            <p className='chat-username'>John</p>
                            <p className='chat-title'>Hello World</p>
                        </div>

                        <div className='time-section'>
                            <p className='chat-time'>Just Now</p>
                            <p className='chat-unread'>2</p>
                        </div>
                    </div>
                </div>

                
            </div>  
        </div>

        <div className='chat-section'>
        <div className='user-time'>
                <h3><GoPrimitiveDot className='user-online'/>Isabella</h3>
                <p>Online | Local time 4:25 PM</p>
            </div>  

          <div className='messages-section'>
                <div className='chat-message-container'>
                    <img className='message-user1-image' src={user2}/>
                    <h5 className='chat-name'>Isabella <span style={{color:"#888", marginLeft:"1rem", fontSize:"1rem"}}>3:51 PM</span>
                    </h5>
                    <p className='message-content'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis tempora 
                        debitis corrupti dolores consectetur ab non necessitatibus consequatur 
                        perferendis rerum aliquam, laboriosam vel!Maiores perspiciatis laudantium 
                        asperiores nostrum vel aliquam!</p>
                </div>

                <div className='chat-message-container'>
                    <img className='message-user1-image' src={prouser}/>
                    <h5 className='chat-name'>Jane Doe <span style={{color:"#888", marginLeft:"1rem", fontSize:"1rem"}}>3:51 PM</span>
                    </h5>
                    <p className='message-content'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis tempora 
                        debitis corrupti dolores consectetur ab non necessitatibus consequatur 
                        perferendis rerum aliquam, laboriosam vel!Maiores perspiciatis laudantium 
                        asperiores nostrum vel aliquam!</p>
                </div>

                <div className='chat-message-container'>
                    <img className='message-user1-image' src={user2}/>
                    <h5 className='chat-name'>Isabella <span style={{color:"#888", marginLeft:"1rem", fontSize:"1rem"}}>3:51 PM</span>
                    </h5>
                    <p className='message-content'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis tempora 
                        debitis corrupti dolores consectetur ab non necessitatibus consequatur 
                        perferendis rerum aliquam, laboriosam vel!Maiores perspiciatis laudantium 
                        asperiores nostrum vel aliquam!</p>
                </div>

                <textarea className='chat-textarea'/>
                <div className='send-btn-container'>
                <button>Send</button>
                </div>
        </div>  
        </div>
    </div>
  )
}
