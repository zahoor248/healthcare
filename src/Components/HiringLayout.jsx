import React, { useEffect, useState } from "react";
import Hiring from "./Hiring/Hiring";
import Toast from "./AppLoader";

export default function HiringLayout() {
  return (
    <>
      <Hiring />
      {/* <Toast status={"info"} showToast={true} label={'tester'} message={'Here you are'}/> */}
    </>
  );
}
