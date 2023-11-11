import React, { useState } from "react";

export default function Toast({ showToast, setShowToast }) {
  const handleClose = () => {
    setShowToast({
      ...showToast,
      toggle: false,
      status: "info",
      message: "close",
      lable: "close",
    });
  };
  return (
    <div
      className={`${
        showToast.toggle === true ? "right-[210px]" : "-right-[250px]"
      } ${
        showToast.status === "info"
          ? "!border-blue-500"
          : showToast.status === "success"
          ? "!border-green-500 dark:border-green-400"
          : "!border-rose-500 dark:border-rose-400"
      } z-[99999] bottom-20 bg-white dark:bg-neutral-800 delay-200 transition-all ease-in-out duration-500  max-w-[225px] fixed border-l-4 rounded-l-md`}
    >
      <div
        className="w-[400px] bg-white dark:bg-neutral-800 shadow-class rounded-r-md overflow-hidden"
        role="alert"
      >
        <div className="flex p-4 items-start justify-between w-full">
          <div className="flex items-start space-x-4">
            {showToast.status != "error" && (
              <svg
                className={`${
                  showToast.status == "info"
                    ? "text-blue-500 dark:text-blue-400"
                    : showToast.status == "success"
                    ? "text-green-500 dark:text-green-400"
                    : "text-rose-500 dark:text-rose-400"
                }`}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C8.83187 3 3 8.83187 3 16C3 23.1681 8.83187 29 16 29C23.1681 29 29 23.1681 29 16C29 8.83187 23.1681 3 16 3ZM22.7656 11.6431L14.3656 21.6431C14.2735 21.7529 14.1588 21.8415 14.0294 21.9031C13.9 21.9647 13.7589 21.9977 13.6156 22H13.5988C13.4586 21.9999 13.32 21.9704 13.192 21.9134C13.064 21.8563 12.9494 21.773 12.8556 21.6688L9.25562 17.6688C9.1642 17.5718 9.09308 17.4575 9.04644 17.3327C8.99981 17.2078 8.9786 17.0749 8.98407 16.9417C8.98953 16.8086 9.02156 16.6778 9.07827 16.5572C9.13498 16.4366 9.21523 16.3286 9.31429 16.2394C9.41336 16.1503 9.52925 16.0818 9.65515 16.0381C9.78105 15.9944 9.91442 15.9763 10.0474 15.9848C10.1804 15.9934 10.3104 16.0284 10.4296 16.0879C10.5489 16.1474 10.655 16.2301 10.7419 16.3312L13.5725 19.4762L21.2344 10.3569C21.4062 10.1582 21.6494 10.0351 21.9113 10.0142C22.1732 9.99335 22.4327 10.0764 22.6339 10.2454C22.8351 10.4143 22.9617 10.6557 22.9863 10.9172C23.0109 11.1788 22.9317 11.4395 22.7656 11.6431Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {showToast.status == "error" && (
              <svg
                classname="'!text-rose-500 dark:text-rose-400'"
                style={{ verticalAlign: "middle", fill: "#f43f5e" }}
                width={32}
                height={32}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 56.888889a455.111111 455.111111 0 1 0 0 910.222222A455.111111 455.111111 0 0 0 512 56.888889z m0 796.444444c-188.245333 0-341.333333-153.088-341.333333-341.333333s153.088-341.333333 341.333333-341.333333 341.333333 153.088 341.333333 341.333333-153.088 341.333333-341.333333 341.333333z"
                  fill
                />
                <path
                  d="M666.851556 357.944889l-0.796445-0.796445a54.044444 54.044444 0 0 0-76.458667 0L512 434.744889 434.403556 357.148444a54.044444 54.044444 0 0 0-76.458667 0l-0.796445 0.796445a54.044444 54.044444 0 0 0 0 76.458667L434.744889 512l-77.596445 77.596444a54.044444 54.044444 0 0 0 0 76.458667l0.796445 0.796445a54.044444 54.044444 0 0 0 76.458667 0L512 589.255111l77.596444 77.596445a54.044444 54.044444 0 0 0 76.458667 0l0.796445-0.796445a54.044444 54.044444 0 0 0 0-76.458667L589.255111 512l77.596445-77.596444a54.044444 54.044444 0 0 0 0-76.458667z"
                  fill
                />
              </svg>
            )}
            <div className="ml-3">
              <h3 className="text-base text-neutral-800 font-semibold dark:text-neutral-200">
                {showToast?.lable}
              </h3>
              <p className="font-normal text-xs text-neutral-600 dark:text-neutral-400">
                {showToast?.message}
              </p>
            </div>
          </div>

          <svg
            onClick={() => handleClose()}
            className={`  ${
              (showToast.status == "info"
                ? "text-blue-500 dark:text-blue-400"
                : showToast.status == "success"
                ? "text-green-500 dark:text-green-400"
                : "text-rose-500 dark:text-rose-400",
              "cursor-pointer hover:text-blue-400")
            }`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 4L12 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
