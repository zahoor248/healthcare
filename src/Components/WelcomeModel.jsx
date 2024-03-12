import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../src/assets/images/logo-image.png";
import { setIsLoggedIn, setUser } from "../Store/Actions/Actions";
import { useNavigate } from "react-router-dom";

const WelcomeModel = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
  };
  return (
    <div className="w-full z-50 bg-blue-100 h-full fixed ">
      {" "}
      <div class="fixed inset-0 m-auto w-[90vw] max-w-[720px] bg-neutral-50 rounded-xl shadow-2xl text-center flex flex-col gap-5 h-fit z-[999999] overflow-hidden px-12 pb-12 pt-36 bg-image">
        <div
          v-if="currentStep == 2"
          class="w-full flex flex-col gap-10 py-10 h-full max-h-[400px] min-h-[400px] items-center justify-center overflow-y-auto content-scroll"
        >
          <img
            src={Logo}
            class="w-72 h-14 object-fit absolute top-[100px] left-10"
          />
          <h3 class="font-bold text-3xl/none text-neutral-800 dark:text-neutral-200">
            Welcome {user?.firstname} &#x1F44B;
          </h3>
          <div>Thanks for signing up for the Healthcare Up beta program.</div>
          <div class="w-full flex flex-col text-neutral-600 items-center gap-3">
            We'll review your registration and send you an email once your
            registration has been approved. The beta program is free. After the
            beta program is closed, you'll be asked to sign up for a payment
            plan. Thanks for your interest in Healthcare Up
          </div>
        </div>
      <button
        onClick={() => handleLogout()}
        className=" border text-[#0f75bc] border-[#0f75bc] px-5 py-2 rounded-md "
      >
        Logout
      </button>
      </div>
    </div>
  );
};

export default WelcomeModel;
