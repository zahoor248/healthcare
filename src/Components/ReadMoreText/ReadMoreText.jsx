import React, { useState } from "react";
import "./ReadMoreText.css";

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 380) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...Read more" : " show less"}
        </span>
      </p>
    );
  };
    
  const ReadMoreText = () => {
    return (
      <div className="container">
        <p className='modal-about-text'>
            <ReadMore>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatibus 
            deleniti culpa omnis id, sed incidunt nostrum assumenda at quaerat a voluptatum 
            praesentium sint rerum error molestias tenetur? Similique, dolorum! Lorem ipsum 
            dolor sit amet consectetur adipisicing elit. Accusantium, facilis in consectetur 
            obcaecati dolorem ad architecto dolore sapiente! Earum corporis ipsam ipsa architecto 
            natus suscipit velit quidem aut repellat. Sed.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatibus 
            deleniti culpa omnis id, sed incidunt nostrum assumenda at quaerat a voluptatum 
            praesentium sint rerum error molestias tenetur? Similique, dolorum! Lorem ipsum 
            dolor sit amet consectetur adipisicing elit. Accusantium, facilis in consectetur 
            obcaecati dolorem ad architecto dolore sapiente! Earum corporis ipsam ipsa architecto 
            natus suscipit velit quidem aut repellat. Sed.
          </ReadMore>
        </p>
      </div>
    );
  };
    
  export default ReadMoreText;