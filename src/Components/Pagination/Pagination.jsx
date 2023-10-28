import React, { useState } from "react";
export default function Pagination() {
  return (
    <>
      <div className="flex gap-3 w-full justify-end mt-6">
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          1
        </div>
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          2
        </div>
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          3
        </div>
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          4
        </div>
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          ...
        </div>
        <div className="w-7 h-7 rounded-full flex justify-center items-center border border-neutral-400 bg-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
