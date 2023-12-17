import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { generateUUID, getStates } from "../../Store/helper";
import emptyState from "../../assets/images/address-book-icon-9.jpg";

import { handleAPIRequest } from "../../helper/ApiHandler";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CommonPrimaryButton from "../CommonPrimaryButton";
export default function License() {
  const [state, setState] = useState("");
  const [user_license, setLicense] = useState("");
  const [number, setNumber] = useState("");
  const [uuid, setUuid] = useState("");
  const [all_licenses, setAllLicenses] = useState([]);

  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [licenseTyes, setLicenseType] = useState([]);
  const user = useSelector((state) => state.user);

  const openAddressModal = (license = null) => {
    setOpenModel(true);
    if (license) {
      setState(license.license_state);
      setLicense(license.name);
      setNumber(license.license_id);
      setUuid(license.uuid);
      setIsEditing(true);
    } else {
      setState("");
      setLicense("");
      setNumber("");
      setIsEditing(false);
    }
  };

  const submitHandler = () => {
    if (isEditing) {
      handleAPIRequest("PUT", `license/${uuid}`, {
        license_type: user_license,
        license_state: state,
        license_id: number,
      })
        .then((response) => {
          setOpenModel(false);
          setIsEditing(false);
        })
        .catch((erroe) => {
          console.log(erroe);
          setOpenModel(false);
          setIsEditing(false);
        });
    } else {
      handleAPIRequest("POST", "license", {
        license_type: user_license,
        license_state: state,
        license_id: number,
      })
        .then((response) => {
          setOpenModel(false);
        })
        .catch((erroe) => {
          console.log(erroe);
          setOpenModel(false);
        });
    }
  };

  useEffect(() => {
    handleAPIRequest("get", "license-types", null)
      .then((response) => {
        console.log(response);

        let licenseTypes = response?.data?.license_types;
        let new_optionsValue = licenseTypes.map((licenseType) => {
          return { label: licenseType.name, value: licenseType.id };
        });
        setLicenseType(new_optionsValue);
      })
      .catch((erroe) => {});
  }, [location]);

  return (
    <div className="w-full flex flex-col gap-4 py-12">
      <div className="profile-editing-header flex justify-between w-full items-center">
        <div className="flex items-center">
          <MdLocationOn className="edit-box-icon" />
          <p className="my-profile-text">My Licenses</p>
        </div>

        <CommonPrimaryButton
          onClick={() => openAddressModal()}
          loading={false}
          text={"Add License"}
        />
      </div>

      <div className="bg-white shadow-class rounded-lg h-full p-8 flex flex-col overflow-auto">
        {user?.licenses?.length > 0 ? (
          <div class="w-full flex flex-col gap-4">
            {user?.licenses?.map((address, index) => (
              <div class=" " key={index}>
                <div class=" bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-700">
                  <div class="text-lg px-6 py-2 flex items-center border-b bg-neutral-100 justify-between w-full font-semibold text-gray-900 dark:text-white">
                    License# {index + 1}
                    <div className="flex gap-2 items-center">
                      <button
                        class=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => openAddressModal(address)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#ef4444"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-col p-6">
                    <div className="flex justify-between w-full">
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          License Type:
                        </strong>{" "}
                        {address.name}
                      </p>
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          State:
                        </strong>{" "}
                        {address.license_state}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          Number:
                        </strong>{" "}
                        {address.license_id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center center flex-col items-center gap-8 border p-8 h-full bg-slate-50 rounded-md ">
            <img src={emptyState} className="w-20 bg-transparent" />
            <div className="text-2xl ">Your address will appear here</div>
            <CommonPrimaryButton
              onClick={() => openAddressModal()}
              loading={false}
              text={"Add License"}
            />
          </div>
        )}
      </div>

      {/* Modal for adding/editing address */}
      {openModel && (
        <div
          onClick={() => setOpenModel(false)}
          className="fixed w-full inset-0 bg-black/60 backdrop-blur-sm z-[11]"
        ></div>
      )}
      {openModel && (
        <div className="w-full max-w-[600px] flex flex-col fixed p-8  z-20 transition-all ease-in-out duration-300 bg-white dark-bg-neutral-900 shadow-xl content-scroll overflow-auto">
          <div className="text-xl pb-4">
            {isEditing ? "Edit License" : "Add License"}
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                License Type
              </p>
              <select
                value={user_license}
                onChange={(e) => setLicense(e.target.value)}
                className="text-lg placeholder-[#B8C0CB] bg-white text-neutral-800  py-3 px-4 border border-[#C2C9D4] rounded w-full outline-none"
              >
                {licenseTyes.map((item) => (
                  <option key={item.label} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                State
              </p>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="text-lg placeholder-[#B8C0CB] bg-white text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full outline-none"
              >
                {getStates().map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-base/none font-normal text-neutral-600">
                Number
              </p>
              <input
                className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                label="Address"
                placeholder="Enter your address"
                variant="outlined"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full justify-end mt-8">
            <button
              className="hover:shadow-[rgba(149, 157, 165, 0.2) 0px 8px 24px 0px] transition-all ease-in-out duration-300 px-8 py-3  bg-[#0f75bc] text-white rounded-md "
              onClick={() => submitHandler()}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
