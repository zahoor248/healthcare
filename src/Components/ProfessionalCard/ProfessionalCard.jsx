import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import VerifiedBadge from "../../assets/images/verified-badge.png";
import UserImage from "../../assets/images/avatar.png";
import { AiFillStar } from "react-icons/ai";
import "./ProfessionalCard.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BsBookmark } from "react-icons/bs";
import Avatar from "../../assets/images/avatar.png";
import VerifiedUser from "../../assets/images/icon-verified.png";
// import ReadMoreText from "../ReadMoreText/ReadMoreText";
import ModalReview from "../ModalReview/ModalReview";
import ReactPaginate from "react-paginate";

export default function ProfessionalCard({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const AllPros = () => {
    return (
      <div className="card-map-container">
        {data.map((item, index) => {
          return (
            <div className="professional-card-container">
              <div className="professional-card">
                <div className="verify-badge">
                  <img
                    src={require("../../assets/images/verified-badge.png")}
                    alt="Verification Badge"
                  />
                </div>

                <div className="user-details">
                  <img
                    src={
                      item.photo_url
                        ? item.photo_url
                        : require("../../assets/images/avatar.png")
                    }
                    alt="User Image"
                  />
                  <div className="username-details">
                    <p className="card-username">
                      {item.firstname} {item.lastname}
                    </p>
                    <p className="card-designation">{item.designation}</p>
                  </div>
                </div>

                <div className="user-about-section">
                  <div className="user-rate">
                    <ul>
                      <li>
                        <span
                          style={{ color: "#1C75BC", marginRight: ".5rem" }}
                        >
                          Rates:
                        </span>{" "}
                        <span
                          style={{
                            color: "#10274F",
                            fontSize: "1.2rem",
                            fontFamily: "NunitoBold",
                          }}
                        >
                          {item.pro_profile
                            ? item.pro_profile.hourly_rate
                            : "0"}
                        </span>
                      </li>
                      <li>
                        <span
                          style={{ color: "#BE1E2D", marginRight: ".5rem" }}
                        >
                          Radius:
                        </span>{" "}
                        <span
                          style={{
                            color: "#10274F",
                            fontSize: "1.2rem",
                            fontFamily: "NunitoBold",
                          }}
                        >
                          {item.radius}
                        </span>
                      </li>
                      <li>
                        <span
                          style={{ color: "#10274F", marginRight: ".5rem" }}
                        >
                          Ratings:
                        </span>{" "}
                        <span
                          style={{
                            color: "#F2BC27",
                            fontSize: "1.2rem",
                            display: "flex",
                          }}
                        >
                          {item.rating}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="view-btn-container">
                  <button className="view-details-btn" onClick={handleShow}>
                    View Details
                  </button>
                </div>
                {/* 
                <Modal
                  className="pro-details-modal"
                  show={show}
                  onHide={handleClose}
                >
                  <div style={{ display: "flex" }}>
                    <div className="modal-pro-info">
                      <div style={{ position: "relative" }}>
                        <BsBookmark className="bookmark-icon" />
                        <div style={{ textAlign: "center" }}>
                          <img
                            className="avatar-pro"
                            src={Avatar}
                            alt="user image"
                          />
                          <p className="modal-pro-user-text">
                            Mathew Bryant{" "}
                            <span style={{ marginLeft: ".4rem" }}>
                              <img
                                style={{ width: "1.2rem" }}
                                src={VerifiedUser}
                                alt="verified user"
                              />
                            </span>
                          </p>
                          <p className="modal-designation">ADON</p>
                        </div>
                      </div>

                      <div style={{ display: "flex", marginTop: "2rem" }}>
                        <p className="modal-rating-heading">Ratings:</p>
                        <div>
                          <AiFillStar className="modal-stars" />
                          <AiFillStar className="modal-stars" />
                          <AiFillStar className="modal-stars" />
                          <AiFillStar className="modal-stars" />
                          <AiFillStar className="modal-stars" />
                        </div>
                      </div>

                      <div style={{ display: "flex", marginTop: ".5rem" }}>
                        <p className="modal-rating-heading">
                          Licensed in: CT, MA, RI, TN
                        </p>
                      </div>

                      <div className="modal-b1"></div>
                    </div>

                    <div className="modal-working-hrs">
                      <div style={{ display: "flex", marginTop: "1.5rem" }}>
                        <p className="modal-rating-heading">
                          <span style={{ color: "#1C75BC" }}>Rates:</span>{" "}
                          $100/day , $50/hour
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <p className="modal-rating-heading">
                          <span style={{ color: "#BE1E2D" }}>Radius:</span> 50
                          miles from 06415
                        </p>
                      </div>

                      <div className="modal-working">
                        <div>
                          <h5 className="modal-working-text">
                            Preferred Working Hours
                          </h5>
                        </div>
                        <ul className="modal-days-schedule">
                          <li>Sun (11 am - 5 pm)</li>
                          <li>Mon (8 am - 9 pm)</li>
                          <li>Tue (8 am - 7 pm)</li>
                          <li>Wed (9 am - 6 pm)</li>
                          <li>Thu (9 am -6 pm)</li>
                          <li>Fri (8 am - 7 pm)</li>
                          <li>Sat (8 am - 7 pm)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="modal-about">
                    <h3 className="modal-about-heading">About Mathew</h3>
                    <ReadMoreText />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "2rem",
                      }}
                    >
                      <button className="modal-contact-btn">
                        Contact this Pro
                      </button>
                      <button className="modal-view-btn">View Profile</button>
                    </div>
                  </div>

                  <div className="modal-b2"></div>

                  <div className="review-section-container">
                    <ModalReview />
                  </div>
                </Modal> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <AllPros currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return <PaginatedItems itemsPerPage={20} />;
}
