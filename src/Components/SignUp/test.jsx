<div className="flex flex-col w-full h-screen  overflow-auto items-center ">
  {/* <Header /> */}
  <div className="flex w-full h-full justify-center flex-col md:flex-row-reverse ">
    <div className="bg-[#4169e1] relative flex-col  flex items-center justify-center w-full">
      <img
        src={Slide2}
        className="h-[200px] w-[200px] py-6 md:!p-0  2xl:w-[500px] object-contain 2xl:h-[500px]  xl:w-[400px]  xl:h-[400px]  md:w-[300px]  md:h-[300px] "
      />
      <div className=" px-2 text-center  hidden md:flex items-center flex-col">
        <h1 className=" text-neutral-200 text-2xl pt-5">
          Healthcare professionals Ready to Hire.
        </h1>
        <p className="lg:max-w-[70%] flex items-center text-center text-neutral-800">
          Pulvinar elementum integer enim neque. Et netus et malesuada fames ac
          turpis. Lectus nulla at volutpat diam ut.
        </p>
      </div>
    </div>

    <div className="h-full w-full flex flex-col justify-center md:w-[90%] md:p-12  overflow-auto p-6 lg:p-24 ">
      <div class="">
        <p class="text-2xl lg:text-3xl leading-normal font-bold">
          Recover Your Password.
        </p>
        <p class="text-sm leading-normal figtree-font text-neutral-900">
          Please enter your{" "}
          {registrationStep == 1
            ? "email"
            : registrationStep == 2
            ? "verification code"
            : "new password"}{" "}
          in order to proceede.
        </p>

        <div className=" mt-4 text-neutral-600 font-semibold mb-3 ">
          Step {registrationStep} of 3
        </div>
      </div>

      {registrationStep == 1 && (
        <div className="w-full gap-4 flex flex-col ">
          <div className="">
            <p className="text-base/none pb-2 font-normal text-neutral-600">
              Email
            </p>
            <div className="relative w-full">
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please Enter Email"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
            </div>
          </div>
        </div>
      )}

      {registrationStep == 2 && (
        <>
          <ReactInputVerificationCode
            length={6}
            onChange={(e) => setVerifyCode(e)}
          />
        </>
      )}
      {registrationStep == 3 && (
        <div className="flex flex-col mt-5  w-full gap-4">
          <div className="w-full">
            <p className="text-base/none pb-2 font-normal text-neutral-600">
              Password
            </p>
            <div className="relative w-full">
              <input
                placeholder="Please Enter Password"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
              <svg
                class="w-7 h-7 text-neutral-700 absolute top-[12px] right-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18 12.7147C18 15.0817 14.866 17.0007 11 17.0007C7.134 17.0007 4 15.0817 4 12.7147C4 10.3477 7.134 8.42969 11 8.42969C14.866 8.42969 18 10.3477 18 12.7147Z"
                  stroke="#525252"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7497 12.7141C12.7643 13.425 12.3473 14.0741 11.6947 14.3563C11.0421 14.6386 10.2835 14.4979 9.77554 14.0003C9.26756 13.5028 9.11112 12.7473 9.37974 12.089C9.64836 11.4306 10.2886 11.0002 10.9997 11.0001C11.459 10.9953 11.9015 11.1732 12.2297 11.4946C12.5579 11.8161 12.7449 12.2547 12.7497 12.7141V12.7141Z"
                  stroke="#525252"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M10.5 8.429C10.5 8.70514 10.7239 8.929 11 8.929C11.2761 8.929 11.5 8.70514 11.5 8.429H10.5ZM11.5 5C11.5 4.72386 11.2761 4.5 11 4.5C10.7239 4.5 10.5 4.72386 10.5 5H11.5ZM17.5704 6.94114C17.6959 6.69514 17.5981 6.39402 17.3521 6.26857C17.1061 6.14312 16.805 6.24086 16.6796 6.48686L17.5704 6.94114ZM15.2426 9.30486C15.1171 9.55086 15.2149 9.85198 15.4609 9.97743C15.7069 10.1029 16.008 10.0051 16.1334 9.75914L15.2426 9.30486ZM5.32043 6.48686C5.19498 6.24086 4.89386 6.14312 4.64786 6.26857C4.40186 6.39402 4.30412 6.69514 4.42957 6.94114L5.32043 6.48686ZM5.86657 9.75914C5.99202 10.0051 6.29314 10.1029 6.53914 9.97743C6.78514 9.85198 6.88288 9.55086 6.75743 9.30486L5.86657 9.75914ZM11.5 8.429V5H10.5V8.429H11.5ZM16.6796 6.48686L15.2426 9.30486L16.1334 9.75914L17.5704 6.94114L16.6796 6.48686ZM4.42957 6.94114L5.86657 9.75914L6.75743 9.30486L5.32043 6.48686L4.42957 6.94114Z"
                  fill="#525252"
                ></path>
              </svg>
            </div>
          </div>
          <div className="w-full">
            <p className="text-base/none pb-2 font-normal text-neutral-600">
              Confirm Password
            </p>
            <div className="relative w-full">
              <input
                placeholder="Please Enter Password"
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
              />
            </div>
          </div>
        </div>
      )}
      <div className="pt-10 w-full relative">
        <button className="bg-[#10274F] text-white w-full py-3 rounded-xl transition-all ease-in-out duration-500 hover:bg-[#0d2041] hover:shadow-lg border hover:border hover:border-[#10274F]">
          {loading
            ? "Please Wait..."
            : registrationStep == 1 || registrationStep == 2
            ? "Next Step..."
            : "Reset Password"}
        </button>
      </div>

      <div className=" pt-4">
        <p>
          Remember your password?{" "}
          <a
            href="/login"
            className="px-2 text-blue-600 hover:text-blue-700 transition-all ease-in-out duration-500 cursor-pointer"
          >
            Login Now
          </a>
        </p>
      </div>
    </div>
  </div>
</div>;
