import React, { useEffect, useState } from "react";
import "./Address.css";
import TextField from "@mui/material/TextField";
import emptyState from "../../assets/images/address-book-icon-9.jpg";

import { BiMessageSquareEdit } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { generateUUID, getStates } from "../../Store/helper";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { useSelector } from "react-redux";
import CommonPrimaryButton from "../CommonPrimaryButton";
import Toast from "../AppLoader";
import { useLocation } from "react-router-dom";
export default function Address() {
  const [nickname, setNickName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const location = useLocation();
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [button_loading, setButton_loading] = useState(false);
  const [adressList, setAdressList] = useState([]);
  const [uuid, setUuid] = useState(null);
  const [address2, setAddress2] = useState("");
  const [showToast, setShowToast] = useState({
    toggle: false,
    lable: "",
    message: "",
    status: "",
  });
  const user = useSelector((state) => state.user);

  const openAddressModal = (address = null) => {
    setOpenModel(true);
    if (address) {
      setIsEditing(true);
      setSelectedAddress(address);
      setNickName(address.nickname);
      setState(address.state);
      setCity(address.city);
      setZipCode(address.zip);
      setAddress(address.address_1);
      setUuid(address.uuid);
      setAddress2(address.address_2);
    } else {
      setSelectedAddress(null);
      setNickName("");
      setState("");
      setCity("");
      setZipCode("");
      setAddress("");
      setIsEditing(false);
    }
  };

  const saveAddress = () => {
    if (
      nickname == "" ||
      state == "" ||
      city == "" ||
      zipCode == "" ||
      address == "" ||
      address2 == ""
    ) {
      setShowToast({
        ...showToast,
        toggle: true,
        status: "error",
        message: "Please fill all the fields",
        lable: "Fields Missing",
      });
      return;
    } else {
      setButton_loading(true);
      if (isEditing) {
        // Edit the existing address
        setOpenModel(false);

        let payload = {
          state: state,
          city: city,
          nickname: nickname,
          zip: zipCode,
          [`address_1`]: address,
          [`address_2`]: address2,
          type: "mailing",
        };

        handleAPIRequest("PUT", `address/${uuid}`, payload)
          .then((response) => {
            if (response) {
              setOpenModel(false);
              setButton_loading(false);
              loadAddres();

              setShowToast({
                ...showToast,
                toggle: true,
                status: "info",
                message: "Adress has been updated",
                lable: "Adress Updated",
              });
              setTimeout(() => {
                setShowToast({
                  ...showToast,
                  toggle: false,
                  status: "info",
                  message: "Adress has been updated",
                  lable: "Adress Updated",
                });
              }, 2000);
            }
          })
          .catch((error) => {
            console.error(error);
            setButton_loading(false);

            setShowToast({
              ...showToast,
              toggle: true,
              status: "error",
              message: "Looks like the address you entered was not valid",
              lable: "Server Error",
            });
            setTimeout(() => {
              setShowToast({
                ...showToast,
                toggle: false,
                status: "info",
                message: "Looks like the address you entered was not valid",
                lable: "Server Error",
              });
            }, 2000);
          });
        // submitHandler(updatedAddresses, true);
      } else {
        // Create a new address object and add it to the addresses array

        const newAddress = {
          nickname,
          state,
          city,
          zipCode,
          address,
        };
        submitHandler(newAddress);
      }
    }
  };

  const submitHandler = (data) => {
    let payload = {
      nickname: data.nickname,
      state: data.state,
      city: data.city,
      zip: data.zipCode,
      [`address_1`]: data.address,
      [`address_2`]: data.address2,
      type: "mailing",
      uuid: generateUUID(),
    };

    handleAPIRequest("POST", "address", payload)
      .then((response) => {
        if (response) {
          setOpenModel(false);
          setAddresses([...addresses, data]);
          loadAddres();
          setButton_loading(false);

          setShowToast({
            ...showToast,
            toggle: true,
            status: "info",
            message: "Adress has been added successfully",
            lable: "Adress Added",
          });
          setTimeout(() => {
            setShowToast({
              ...showToast,
              toggle: false,
              status: "info",
              message: "Adress has been added successfully",
              lable: "Adress Added",
            });
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
        setButton_loading(false);

        setShowToast({
          ...showToast,
          toggle: true,
          status: "error",
          message: "Looks like the address you entered was not valid",
          lable: "Server Error",
        });
        setTimeout(() => {
          setShowToast({
            ...showToast,
            toggle: false,
            status: "info",
            message: "Looks like the address you entered was not valid",
            lable: "Server Error",
          });
        }, 2000);
      });
  };

  useEffect(() => {
    loadAddres();
  }, [location, user]);

  const loadAddres = () => {
    handleAPIRequest("get", `address`, null)
      .then((response) => {
        if (response?.addresses) {
          setAdressList(response.addresses);
        }
      })
      .catch((error) => {});
  };
  return (
    <div className="w-full flex flex-col gap-4 py-12">
      <div className="profile-editing-header flex justify-between w-full items-center">
        <div className="flex items-center">
          <MdLocationOn className="edit-box-icon" />
          <p className="my-profile-text">Address</p>
        </div>
        <CommonPrimaryButton
          onClick={() => openAddressModal()}
          loading={false}
          text={"Add Address"}
        />
      </div>

      <div className="bg-white shadow-class rounded-lg h-full p-8 flex flex-col overflow-auto">
        {adressList?.length > 0 ? (
          <div class="w-full flex flex-col gap-4">
            {adressList?.map((address, index) => (
              <div class=" " key={index}>
                <div class=" bg-white border rounded-lg dark:bg-gray-900 dark:border-gray-700">
                  <div class="text-md px-6 py-2 flex items-center border-b bg-neutral-100 justify-between w-full font-semibold text-neutral-800 dark:text-white">
                    <span className="text-base text-neutral-700">
                      Name: <span className="text-sm">{address.nickname}</span>
                    </span>
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
                      {/* delete icon here  */}
                      {/* <svg
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
                    </svg> */}
                    </div>
                  </div>
                  <div className="flex gap-3 flex-col p-6">
                    <div className="flex justify-between w-full">
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          Adress:
                        </strong>{" "}
                        {address.address_1}
                      </p>
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          State:
                        </strong>{" "}
                        {address.state}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          City:
                        </strong>{" "}
                        {address.city}
                      </p>
                      <p>
                        <strong className="text-neutral-600 font-bold">
                          {" "}
                          Zip Code:
                        </strong>{" "}
                        {address.zip}
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
              text={"Add Address"}
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
        <div className="h-screen inset-0 flex justify-center items-center w-full fixed z-50  m-auto">
          <div className="w-full max-w-[600px] flex flex-col fixed justify-start items-start p-8 z-20 transition-all ease-in-out duration-300 bg-white dark-bg-neutral-900 shadow-xl content-scroll overflow-auto">
            <div className="text-xl pb-4">
              {isEditing ? "Edit Address" : "Add Address"}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  NickName
                </p>
                <input
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="nickname"
                  variant="outlined"
                  placeholder="Enter your NickName"
                  value={nickname}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  Street Address
                </p>
                <input
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="Address"
                  placeholder="Enter your address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  Address 2
                </p>
                <input
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="Address"
                  placeholder="Enter your address"
                  variant="outlined"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  City
                </p>
                <input
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="City"
                  placeholder="Enter your City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
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
                  <option value="" disabled selected>
                    <div className="!text-neutral-500"> Select State</div>
                  </option>
                  {getStates().map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-base/none font-normal text-neutral-600">
                  Zip Code
                </p>
                <input
                  className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                  label="Zip Code"
                  placeholder="Enter Zip Code"
                  variant="outlined"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 w-full justify-end mt-12">
              <button
                onClick={() => setOpenModel(false)}
                className=" border text-[#0f75bc] border-[#0f75bc] px-5 py-[11px] rounded-md "
              >
                Cancel
              </button>
              <CommonPrimaryButton
                onClick={saveAddress}
                loading={button_loading}
                text={"Save Adress"}
              />
            </div>
          </div>{" "}
        </div>
      )}
      <Toast setShowToast={setShowToast} showToast={showToast} />
    </div>
  );
}
