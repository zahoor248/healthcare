import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../assets/images/logo-image.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import { MdPrivacyTip } from "react-icons/md";
import "./Navbar.css";

import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineVideoCamera,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";

function NavBar() {
  const [expand, updateExpanded] = React.useState(false);
  const [navColour, updateNavbar] = React.useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <div 
      className={navColour ? "sticky" : "navbar"}
    >
      <div className="flex justify-between">
        <Link to="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Link>
        <div
         
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div id="responsive-navbar-nav" className="flex">
          <div className="ms-auto flex justify-between gap-10" defaultActiveKey="#home">
            <div>
              <div as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </div>
            </div>

            <div>
              <div
                as={Link}
                to="/tutorials"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Favourites
              </div>
            </div>

            <div>
              <div
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Reservations
              </div>
            </div>

            <div>
              <div
                as={Link}
                to="/privacy-policy"
                onClick={() => updateExpanded(false)}
              >
                <MdPrivacyTip style={{ marginBottom: "2px" }} /> Contracts
              </div>
            </div>
            <div>
              <div
                as={Link}
                to="/terms"
                onClick={() => updateExpanded(false)}
              >
                <ImBlog style={{ marginBottom: "2px" }} /> Chats
              </div>
            </div>
            {/* <div className="fork-btn">
              <Button
                href="https://github.com/soumyajit4419/Portfolio"
                target="_blank"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
