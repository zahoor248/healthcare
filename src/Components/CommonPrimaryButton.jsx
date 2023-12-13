import React from "react";

const CommonPrimaryButton = ({ onClick, text, loading }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${
          loading ? " bg-blue-700/60 loading_shadow" : "bg-blue-700"
        } hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-6 py-3  bg-[#0f75bc] text-white rounded-md `}
      >
        {!loading ? (
          <>{text}</>
        ) : (
          <div class="loader">
            <div className="opacity-0">{text}</div>
            <div class="justify-content-center jimu-primary-loading"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default CommonPrimaryButton;
