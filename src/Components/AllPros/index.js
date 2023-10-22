import React, { useEffect, useState } from "react";
import "./index.css";
import { useGetDataQuery } from "../../redux-setup/apiSlice";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPros } from "../../redux-setup/TestSlice";
function ListingComponent() {
  const { data: allData, isLoading } = useGetDataQuery(null, {});
  // const [data, setData] = useState([]);
  
  const data = useSelector((state) => state.dataSlice.pros);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Array.isArray(allData)) {
      dispatch(setPros(allData));
      // setData(allData);
    }
  }, [allData]);
  console.log(data);
  return (
    <>
      <section className="listing-banner-area">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-12">
              <div className="listing-banner">
                <h2>Healthcare Professionals Ready to Hire.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="listing-area">
        <div className="container mx-auto">
          <div className="row">
            <div className="col-12">
              <div className="listing-inner">
                <div className="listing-left">
                  <div className="filters">
                    <span>
                      <img
                        src="https://app.healthcare-up.com.com/assets/img/listing/filter.svg"
                        alt="icon"
                      />{" "}
                      <span>Filters</span>
                    </span>
                  </div>
                  <div className="single-type">
                    <h3 className="mb-15">Tags</h3>
                    <input id="tag-filter" />
                  </div>
                  <div className="single-type">
                    <h3>License Type</h3>
                    <div className="check-box">
                      <div className="control">
                        <label>
                          <input type="checkbox" defaultChecked /> ADON
                        </label>
                        <label>
                          <input type="checkbox" defaultChecked /> PT
                        </label>
                        <label>
                          <input type="checkbox" /> OT
                        </label>
                        <label>
                          <input type="checkbox" /> Massage Therapist
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="single-type">
                    <h3>Hourly Rate</h3>
                    <div className="slider-range-wrap">
                      <div id="slider-range"></div>
                    </div>
                  </div>
                  <div className="refine-bttn">
                    <a href="#">Refine</a>
                  </div>
                </div>
                <div className="listing-right">
                  <div className="sort-by">
                    <span>Sort by :</span>
                    <select name="#">
                      <option value="#">Hourly Rate</option>
                      <option value="#">Daily Rate</option>
                    </select>
                  </div>
                  <div
                    id="details-area"
                    className="grid md:grid-cols-2 gap-4 2xl:grid-cols-3"
                  >
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      data.map((it) => (
                        <div className="p-4 shadow-[0_8px_32px_0_rgba(16,39,79,.12)] flex flex-col justify-between h-full">
                          {/* <img
                            src="src/assets/images/avatar.png"
                            alt={it.firstname + " " + it.lastname}
                          /> */}
                          <div className="flex gap-4 items-center mb-8">
                            <div className="w-20 h-20 bg-slate-600 rounded-full flex-shrink-0" />
                            <div className="flex flex-col items-start">
                              <h2 className="text-xl font-semibold">
                                {it.firstname + " " + it.lastname}
                              </h2>
                              <h6>
                                {it.licenses.map(
                                  (item, i) =>
                                    (i !== 0 ? "," : "") + item.abbrev
                                )}
                              </h6>
                            </div>
                          </div>
                          {it.pro_profile && (
                            <p className="w-full">
                              <span className="text-[#1c75bc] font-bold  text-lg">
                                Rates:
                              </span>{" "}
                              ${it.pro_profile?.daily_rate}/day $
                              {it.pro_profile?.hourly_rate}
                              /hour
                            </p>
                          )}
                          {it.pro_profile && (
                            <p className="w-full">
                              <span className="text-[#be1e2d] font-bold text-lg">
                                Radius:
                              </span>{" "}
                              {it.pro_profile.radius} miles from 06514{""}
                            </p>
                          )}
                          <button className="w-full py-5 border hover:bg-[#1c75bc] transition-all duration-300 ease-in-out hover:text-white rounded-lg mt-6">
                            View Details
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="show-more">
                    <a href="#">Show More...</a>
                  </div>
                  <div className="pagination">
                    <ul>
                      <li>
                        <a className="" href="#" aria-label="Previous">
                          <span aria-hidden="true">
                            <img
                              src="https://app.healthcare-up.com.com/assets/img/listing/arrow-left.svg"
                              alt=""
                            />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a className="" href="#">
                          1
                        </a>
                      </li>
                      <li>
                        <a className="" href="#">
                          2
                        </a>
                      </li>
                      <li>
                        <a className="" href="#">
                          3
                        </a>
                      </li>
                      <li>
                        <a className="" href="#">
                          <img
                            src="https://app.healthcare-up.com.com/assets/img/listing/dots.svg"
                            alt="icon"
                          />
                        </a>
                      </li>
                      <li>
                        <a className="" href="#" aria-label="Next">
                          <span aria-hidden="true">
                            <img
                              src="https://app.healthcare-up.com.com/assets/img/listing/arrow-right.svg"
                              alt=""
                            />
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ListingComponent;

const arrayData = [
  {
    is_admin: 0,
    type: "pro",
    uuid: "1fdd44d0-150b-4a3d-b04c-1e9ebf2f20fb",
    firstname: "faraz",
    lastname: "king",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [
      {
        id: 85,
        abbrev: "AI",
        name: "Audiology Assistant",
        state: "Pak",
      },
      {
        id: 3,
        abbrev: "AP",
        name: "Licensed Acupuncturist",
        state: "Ww",
      },
    ],
    pro_profile: {
      id: 13,
      uuid: "4eb16ac3-02d4-43fa-9905-8fad43369753",
      account_id: 0,
      user_id: 19,
      hourly_rate: 11,
      daily_rate: 22,
      radius: 22,
      working_hours: [
        {
          id: "3",
          day: "Sun",
          name: "Sunday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
        {
          id: "4",
          day: "Mon",
          name: "Monday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
        {
          id: "5",
          day: "Tues",
          name: "Tuesday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
        {
          id: "6",
          day: "Wed",
          name: "Wednesday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
        {
          id: "7",
          day: "Thu",
          name: "Thursday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
        {
          id: "1",
          day: "Fri",
          name: "Friday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
        {
          id: "2",
          day: "Sat",
          name: "Saturday",
          toTime: "8:00 AM",
          fromTime: "7:00 PM",
        },
      ],
      created_at: "2023-06-25T10:31:40.000000Z",
      updated_at: "2023-06-25T10:31:40.000000Z",
    },
    reviews: [],
    accounts: [],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "7203c93b-049a-4d3c-8f24-12be61a91998",
    firstname: "iphone",
    lastname: "test",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "cb204f1a-a8dc-4c19-9bb6-0e97a861e5c1",
    firstname: "Mat",
    lastname: "Tester",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "7da7585b-96b2-4f7a-a1bf-df3c22aed8f0",
    firstname: "testing",
    lastname: "account",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 4,
        account_id: 4,
        user_id: 23,
        status: "active",
        uuid: "91879f47-ab70-402d-b072-b9bda51a9a1b",
        type: "bus",
        owner_id: 23,
        name: "Enter Account Name",
        updated_at: "2023-07-27T09:39:18.000000Z",
        created_at: "2023-07-27T09:39:18.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "6b74737c-62f5-47ed-b4b4-d312edafd003",
    firstname: "new",
    lastname: "user",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 3,
        account_id: 3,
        user_id: 24,
        status: "active",
        uuid: "5ffcfb32-9471-46c0-af9b-39e2a48f14e7",
        type: "pro",
        owner_id: 22,
        name: "Enter Account Name",
        updated_at: "2023-07-19T18:46:00.000000Z",
        created_at: "2023-07-19T18:46:00.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "f7371985-ef4a-48f6-84b4-897442ae0325",
    firstname: "hello",
    lastname: "world",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 6,
        account_id: 6,
        user_id: 25,
        status: "active",
        uuid: "9e590ad1-a384-4a35-88b7-103861ea73f6",
        type: "bus",
        owner_id: 25,
        name: "Enter Account Name",
        updated_at: "2023-07-27T09:47:49.000000Z",
        created_at: "2023-07-27T09:47:49.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "7dfbbc11-0ede-411c-8264-5095b3434950",
    firstname: "hello",
    lastname: "world",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 7,
        account_id: 7,
        user_id: 26,
        status: "active",
        uuid: "9af38364-937f-4030-b1af-001a5b8e806c",
        type: "bus",
        owner_id: 26,
        name: "Enter Account Name",
        updated_at: "2023-07-27T09:48:34.000000Z",
        created_at: "2023-07-27T09:48:34.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "0b84be73-ac23-4895-b6bf-85488e9dbf7d",
    firstname: "New account",
    lastname: "Test",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [
      {
        id: 4,
        abbrev: "AA",
        name: "Anesthesiologist Assistant",
        state: "Fa",
      },
    ],
    pro_profile: {
      id: 14,
      uuid: "c5edff83-6b16-4d77-beae-3b38f43d7d66",
      account_id: 8,
      user_id: 32,
      hourly_rate: 20,
      daily_rate: 20,
      radius: 2000,
      working_hours: [
        {
          id: "3",
          day: "Sun",
          name: "Sunday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
        {
          id: "4",
          day: "Mon",
          name: "Monday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
        {
          id: "5",
          day: "Tues",
          name: "Tuesday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
        {
          id: "6",
          day: "Wed",
          name: "Wednesday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
        {
          id: "7",
          day: "Thu",
          name: "Thursday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
        {
          id: "1",
          day: "Fri",
          name: "Friday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
        {
          id: "2",
          day: "Sat",
          name: "Saturday",
          toTime: "8:00 AM",
          fromTime: "11:00 PM",
        },
      ],
      created_at: "2023-08-16T16:31:11.000000Z",
      updated_at: "2023-08-16T16:31:11.000000Z",
    },
    reviews: [],
    accounts: [
      {
        id: 8,
        account_id: 8,
        user_id: 32,
        status: "active",
        uuid: "00f532c9-71a4-4be8-bc86-fc772205d5dc",
        type: "pro",
        owner_id: 32,
        name: "New account's Account",
        updated_at: "2023-08-16T16:13:28.000000Z",
        created_at: "2023-08-16T16:13:28.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "f6b348b9-4ef0-4a7a-981f-2922d17bdb44",
    firstname: "New",
    lastname: "Bus",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 10,
        account_id: 10,
        user_id: 34,
        status: "active",
        uuid: "54fd0564-b5a2-42db-9a3d-b451b1128d20",
        type: "bus",
        owner_id: 34,
        name: "New's Account",
        updated_at: "2023-08-17T16:24:44.000000Z",
        created_at: "2023-08-17T16:24:44.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "55f65c92-a55b-4def-9a83-d5cdbcdccd70",
    firstname: "Mathew",
    lastname: "Pro",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url:
      "https://app.healthcare-up.com/public/profiles/64f1e78159ce3_image.jpg",
    fcm_token:
      "cAHH5UyQTGOz5IreW7Ljiv:APA91bGkX1TQirIbC7e6oYWx9_4sm7DaAdXCQw6JJsckyhlUKmC4CTQ_6-1epMzNt3ujkDrMIdVvsndtKR7m1HFU1m68pcPRtwJfnHlaLbbnn1eZ73zCGeAgzFRO4h8pF8U9jBondEkE",
    code: null,
    licenses: [
      {
        id: 5,
        abbrev: "AL",
        name: "Athletic Trainer",
        state: "CT",
      },
      {
        id: 3,
        abbrev: "AP",
        name: "Licensed Acupuncturist",
        state: "CT",
      },
    ],
    pro_profile: {
      id: 16,
      uuid: "45aa3018-c377-4722-9af1-5e2016cd41bf",
      account_id: 11,
      user_id: 35,
      hourly_rate: 90,
      daily_rate: 720,
      radius: 100,
      working_hours: [
        {
          id: "3",
          day: "Sun",
          name: "Sunday",
          toTime: null,
          fromTime: null,
        },
        {
          id: "4",
          day: "Mon",
          name: "Monday",
          toTime: "9:00 AM",
          fromTime: "5:00 PM",
        },
        {
          id: "5",
          day: "Tues",
          name: "Tuesday",
          toTime: "9:00 AM",
          fromTime: "5:00 PM",
        },
        {
          id: "6",
          day: "Wed",
          name: "Wednesday",
          toTime: "9:00 AM",
          fromTime: "5:00 PM",
        },
        {
          id: "7",
          day: "Thu",
          name: "Thursday",
          toTime: "9:00 AM",
          fromTime: "5:00 PM",
        },
        {
          id: "1",
          day: "Fri",
          name: "Friday",
          toTime: "9:00 AM",
          fromTime: "5:00 PM",
        },
        {
          id: "2",
          day: "Sat",
          name: "Saturday",
          toTime: null,
          fromTime: null,
        },
      ],
      created_at: "2023-09-01T13:33:00.000000Z",
      updated_at: "2023-09-01T13:33:00.000000Z",
    },
    reviews: [],
    accounts: [
      {
        id: 11,
        account_id: 11,
        user_id: 35,
        status: "active",
        uuid: "7b57a90f-306a-4165-a455-9dd186890f0e",
        type: "pro",
        owner_id: 35,
        name: "Mathew's Account",
        updated_at: "2023-08-17T19:16:08.000000Z",
        created_at: "2023-08-17T19:16:08.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "b66d5ae5-7e08-4635-ac9a-08e2681efbb3",
    firstname: "testing",
    lastname: "1",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 13,
        account_id: 13,
        user_id: 37,
        status: "active",
        uuid: "59e7f0bf-6bea-4f9f-9841-8248726f51f3",
        type: "pro",
        owner_id: 37,
        name: "testing's Account",
        updated_at: "2023-08-21T16:30:27.000000Z",
        created_at: "2023-08-21T16:30:27.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "2a66a857-42d7-415d-a030-cd15d3dbc8cd",
    firstname: "fazz",
    lastname: "pro",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "ebLKOE2BB0KnlIwR4Tn6g7:APA91bGZ-hrj4uVRJknwHXWGiz91EZmyXD5eUWqO01e86mRux9fBNGdBRZ9K2Xtr7AZhs5DKNlmKRQWRr0zfF4VydyAsiJ7UFmF3kLlL5rBjPhm0I9yJwdDzvpGSdl3vnk65BRhmo2_2",
    code: "2tBBCC",
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 19,
        account_id: 19,
        user_id: 44,
        status: "active",
        uuid: "da5358b2-f1b4-401a-9aec-7f015d95143e",
        type: "pro",
        owner_id: 44,
        name: "fazz's Account",
        updated_at: "2023-08-29T17:04:56.000000Z",
        created_at: "2023-08-29T17:04:56.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "860a9701-0915-4bc1-8411-365371cc7c32",
    firstname: "fff",
    lastname: "fff",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 20,
        account_id: 20,
        user_id: 45,
        status: "active",
        uuid: "6d2d8374-1598-44ea-b5e4-b000e82ee0f5",
        type: "pro",
        owner_id: 45,
        name: "fff's Account",
        updated_at: "2023-08-29T17:07:43.000000Z",
        created_at: "2023-08-29T17:07:43.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "39bdea64-4f3c-4905-b84b-a856ecb2ce1a",
    firstname: "fff",
    lastname: "fff",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 21,
        account_id: 21,
        user_id: 46,
        status: "active",
        uuid: "09fc1828-e56c-4d17-9a40-d2d82c4c5833",
        type: "pro",
        owner_id: 46,
        name: "fff's Account",
        updated_at: "2023-08-29T17:09:40.000000Z",
        created_at: "2023-08-29T17:09:40.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "202df349-333a-4988-8dbf-75dd2ac84351",
    firstname: "fff",
    lastname: "fff",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 22,
        account_id: 22,
        user_id: 47,
        status: "active",
        uuid: "b49d2dbd-3a06-4888-b0a2-447d5707a771",
        type: "pro",
        owner_id: 47,
        name: "fff's Account",
        updated_at: "2023-08-29T17:10:15.000000Z",
        created_at: "2023-08-29T17:10:15.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "9689aeed-7ae8-4b45-aef2-15a7df8b153a",
    firstname: "mazakha",
    lastname: "hai",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 24,
        account_id: 24,
        user_id: 49,
        status: "active",
        uuid: "3757f343-d02c-4381-9906-62379f19e3c6",
        type: "pro",
        owner_id: 49,
        name: "mazakha's Account",
        updated_at: "2023-08-29T17:15:18.000000Z",
        created_at: "2023-08-29T17:15:18.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "cdb1a58a-c535-462d-bb0d-e285d14a76d5",
    firstname: "Faraz",
    lastname: "Syed",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 25,
        account_id: 25,
        user_id: 50,
        status: "active",
        uuid: "ae5fb579-501c-4cd0-ad5f-bc483a6a827c",
        type: "pro",
        owner_id: 50,
        name: "Faraz's Account",
        updated_at: "2023-08-29T17:24:11.000000Z",
        created_at: "2023-08-29T17:24:11.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "60dde9f7-0159-41ed-989f-2a811d2c3c33",
    firstname: "Mat",
    lastname: "Tester",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 26,
        account_id: 26,
        user_id: 51,
        status: "active",
        uuid: "161dc8f5-09af-4e13-b689-d347c85a6fd1",
        type: "pro",
        owner_id: 51,
        name: "Mat's Account",
        updated_at: "2023-08-29T17:33:15.000000Z",
        created_at: "2023-08-29T17:33:15.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "32fca0a6-1715-441e-bb9e-59398dd7aeac",
    firstname: "testing",
    lastname: "pro",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 27,
        account_id: 27,
        user_id: 52,
        status: "active",
        uuid: "5ad811dd-5bcc-45e7-b9b9-71837471575e",
        type: "pro",
        owner_id: 52,
        name: "testing's Account",
        updated_at: "2023-08-29T17:39:50.000000Z",
        created_at: "2023-08-29T17:39:50.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "6ff2526a-cef9-4fcd-a98e-75d495904de5",
    firstname: "pro",
    lastname: "king",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: null,
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 28,
        account_id: 28,
        user_id: 53,
        status: "active",
        uuid: "b1ae1ebe-34ca-4f76-978f-12d386a608f0",
        type: "pro",
        owner_id: 53,
        name: "pro's Account",
        updated_at: "2023-08-29T17:41:08.000000Z",
        created_at: "2023-08-29T17:41:08.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "c90ed10e-68a5-48b0-936e-96bcb4916159",
    firstname: "hello",
    lastname: "fazzy",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "eZHIjas02klKgj9HXh0CkD:APA91bHmgUvziksYKxa9TpxO2FO_yHX4UD9g4YN54KBuK1X6fQCEGXzBqFQ3ONI-A0YdH-9duKxDesVDict2kDzXAkc6PfN1nPzjbm8Foplqs8BHIqZlP26mHv_FoS-gbUng5iT-E1M3",
    code: null,
    licenses: [
      {
        id: 4,
        abbrev: "AA",
        name: "Anesthesiologist Assistant",
        state: "faraz",
      },
    ],
    pro_profile: {
      id: 15,
      uuid: "a73a2463-f71e-44bf-9282-a6f1068e37ab",
      account_id: 29,
      user_id: 54,
      hourly_rate: 20,
      daily_rate: 40,
      radius: 10,
      working_hours: [
        {
          id: "3",
          day: "Sun",
          name: "Sunday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
        {
          id: "4",
          day: "Mon",
          name: "Monday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
        {
          id: "5",
          day: "Tues",
          name: "Tuesday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
        {
          id: "6",
          day: "Wed",
          name: "Wednesday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
        {
          id: "7",
          day: "Thu",
          name: "Thursday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
        {
          id: "1",
          day: "Fri",
          name: "Friday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
        {
          id: "2",
          day: "Sat",
          name: "Saturday",
          toTime: "8:00 AM",
          fromTime: "10:00 PM",
        },
      ],
      created_at: "2023-08-30T17:02:00.000000Z",
      updated_at: "2023-08-30T17:02:00.000000Z",
    },
    reviews: [
      {
        id: 16,
        contract_id: 14,
        user_id: 54,
        reviewer_id: 62,
        rating: 5,
        feedback: "good",
        updated_at: "2023-10-05T17:03:25.000000Z",
        created_at: "2023-10-05T17:03:25.000000Z",
      },
    ],
    accounts: [
      {
        id: 29,
        account_id: 29,
        user_id: 54,
        status: "active",
        uuid: "463dfb9c-ec81-425c-b20e-36b148a35cbc",
        type: "pro",
        owner_id: 54,
        name: "hello's Account",
        updated_at: "2023-08-30T16:48:35.000000Z",
        created_at: "2023-08-30T16:48:35.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "ac8c2464-f7ce-4e7d-b551-6f26bcc478ca",
    firstname: "John",
    lastname: "Bradford",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "dTiNK-THBU0Ir0Prk3Nw_5:APA91bG6sA073i7bAHmf7EspdJIu0w50oNoD5R8VnRow5CVA7Oni0Q9Yhhv2npXhmhLOTqumIuDkpRcyYOl5hC7Bay8ER9OyS_bfDW6jUN98SkoNR03HONqoHFnJ6Bzt4QxOL1Cggx0-",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 33,
        account_id: 33,
        user_id: 58,
        status: "active",
        uuid: "1d3a780e-a81e-4e9d-be94-589c885eca85",
        type: "pro",
        owner_id: 58,
        name: "John's Account",
        updated_at: "2023-09-02T00:46:18.000000Z",
        created_at: "2023-09-02T00:46:18.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "8a7a08aa-2cab-4c33-a55a-801ee0408052",
    firstname: "Yeasinul Haque",
    lastname: "Sani",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "fEylbLrxR--LpR4lA-i5VI:APA91bHOSrxVIHW9itKfHjIvQ5pPV6PR5GuSWn_XcxzxRmAmacKgqjse_0QV4y-XHRSabd_oIbZ9g36SzuuOBrXGja-HY79XxsFDWk9c-ABEyu5y1QhCwNCITU2ncDUi_lyk1C9EXfi6",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 34,
        account_id: 34,
        user_id: 59,
        status: "active",
        uuid: "07a6ffbc-98c8-443d-a406-157cb79092eb",
        type: "pro",
        owner_id: 59,
        name: "Yeasinul Haque's Account",
        updated_at: "2023-09-08T13:27:51.000000Z",
        created_at: "2023-09-08T13:27:51.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "82eb0902-3288-45f5-8d1f-82e44b3b52df",
    firstname: "Fazzy",
    lastname: "Syed",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "dKOTo7hcLkQ3umbqyDQdan:APA91bFJgSZ3UuUcroFOFsUngyYTVIVyfUF5cplaV-LynHBQ3k7lbc8BLSMCsNJT0PcjbkBewV7PUuy-XYHnKTvd0rgJxaaUt-gM2rlcTAIYJH8Ng2dv7smyGZDG4mudLRuxwSLSFdz8",
    code: "E1QQTk",
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 35,
        account_id: 35,
        user_id: 60,
        status: "active",
        uuid: "f79601df-936c-44bc-953c-7e618badfc8d",
        type: "pro",
        owner_id: 60,
        name: "Fazzy's Account",
        updated_at: "2023-09-21T10:33:37.000000Z",
        created_at: "2023-09-21T10:33:37.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "59dd4f9a-5004-40ac-85c1-76aff398587d",
    firstname: "Fazzy",
    lastname: "Syed 2",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "eZHIjas02klKgj9HXh0CkD:APA91bHmgUvziksYKxa9TpxO2FO_yHX4UD9g4YN54KBuK1X6fQCEGXzBqFQ3ONI-A0YdH-9duKxDesVDict2kDzXAkc6PfN1nPzjbm8Foplqs8BHIqZlP26mHv_FoS-gbUng5iT-E1M3",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 38,
        account_id: 38,
        user_id: 63,
        status: "active",
        uuid: "e3451b81-2def-44ee-9f75-430797764704",
        type: "pro",
        owner_id: 63,
        name: "Fazzy's Account",
        updated_at: "2023-10-05T16:48:41.000000Z",
        created_at: "2023-10-05T16:48:41.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "c40cdb59-92aa-48df-a7fe-08b1bf3a3ccb",
    firstname: "yh",
    lastname: "Sunny",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token:
      "cmY8Z_F-RJSJSJKcU4p2UH:APA91bGpsYze-BxxULfZlOFCKiMd_0vJStDp5pj_7SbXydf-0HJ0GXi_vO8UnSr6fyLjOkxG6dl3xzFCnlJ2ft2sh0XMaTFQBvjxRCbjpthRmttZ1JRcazDe-o_P0frzPZvKhJFH5RAS",
    code: null,
    licenses: [
      {
        id: 4,
        abbrev: "AA",
        name: "Anesthesiologist Assistant",
        state: "MS",
      },
    ],
    pro_profile: {
      id: 18,
      uuid: "77d447ee-3122-415b-b75e-1d31acbda87d",
      account_id: 39,
      user_id: 64,
      hourly_rate: 100,
      daily_rate: 400,
      radius: 5,
      working_hours: [
        {
          id: "3",
          day: "Sun",
          name: "Sunday",
          toTime: "8:00 AM",
          fromTime: "5:00 PM",
        },
        {
          id: "4",
          day: "Mon",
          name: "Monday",
          toTime: "9:00 AM",
          fromTime: "8:00 PM",
        },
        {
          id: "5",
          day: "Tues",
          name: "Tuesday",
          toTime: null,
          fromTime: null,
        },
        {
          id: "6",
          day: "Wed",
          name: "Wednesday",
          toTime: "8:00 AM",
          fromTime: "9:00 PM",
        },
        {
          id: "7",
          day: "Thu",
          name: "Thursday",
          toTime: null,
          fromTime: null,
        },
        {
          id: "1",
          day: "Fri",
          name: "Friday",
          toTime: null,
          fromTime: null,
        },
        {
          id: "2",
          day: "Sat",
          name: "Saturday",
          toTime: null,
          fromTime: null,
        },
      ],
      created_at: "2023-10-05T17:16:22.000000Z",
      updated_at: "2023-10-05T17:16:22.000000Z",
    },
    reviews: [],
    accounts: [
      {
        id: 39,
        account_id: 39,
        user_id: 64,
        status: "active",
        uuid: "bcc34049-fd4e-4c2d-967c-6ddfb8e7ad37",
        type: "pro",
        owner_id: 64,
        name: "yh's Account",
        updated_at: "2023-10-05T17:08:20.000000Z",
        created_at: "2023-10-05T17:08:20.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "1a563696-4369-4978-bd81-e6deb1f04c50",
    firstname: "123",
    lastname: "213",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: "123456",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 40,
        account_id: 40,
        user_id: 65,
        status: "active",
        uuid: "9cab17e2-d5d0-47c7-add9-3f38233bae63",
        type: "pro",
        owner_id: 65,
        name: "123's Account",
        updated_at: "2023-10-18T21:44:05.000000Z",
        created_at: "2023-10-18T21:44:05.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "3556c0e5-9c1b-4b0b-96bd-94dbc3d3fb11",
    firstname: "213",
    lastname: "23",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: "123456",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 41,
        account_id: 41,
        user_id: 66,
        status: "active",
        uuid: "1854b0ac-d7ea-4455-8a93-86183f8638ae",
        type: "pro",
        owner_id: 66,
        name: "213's Account",
        updated_at: "2023-10-18T21:51:49.000000Z",
        created_at: "2023-10-18T21:51:49.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "cac4a417-335b-4c4f-92a0-7075ca9f7351",
    firstname: "213",
    lastname: "23",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: "123456",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 42,
        account_id: 42,
        user_id: 67,
        status: "active",
        uuid: "91c39ace-6378-4a34-911f-c71aadcec85b",
        type: "pro",
        owner_id: 67,
        name: "213's Account",
        updated_at: "2023-10-18T21:52:03.000000Z",
        created_at: "2023-10-18T21:52:03.000000Z",
      },
    ],
  },
  {
    is_admin: 0,
    type: "pro",
    uuid: "3d796dc8-d4cb-417e-abbe-d50d16f13314",
    firstname: "342",
    lastname: "324",
    status: "active",
    about_me: null,
    verified: "no",
    photo_url: null,
    fcm_token: "123456",
    code: null,
    licenses: [],
    pro_profile: null,
    reviews: [],
    accounts: [
      {
        id: 43,
        account_id: 43,
        user_id: 68,
        status: "active",
        uuid: "9cdde434-f0b2-4384-9545-cf0d8a5ec1c2",
        type: "pro",
        owner_id: 68,
        name: "342's Account",
        updated_at: "2023-10-18T21:53:23.000000Z",
        created_at: "2023-10-18T21:53:23.000000Z",
      },
    ],
  },
];
