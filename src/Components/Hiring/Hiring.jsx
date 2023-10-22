import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Hiring.css";
import ProfessionalCard from "../ProfessionalCard/ProfessionalCard";
import { useDispatch, useSelector } from "react-redux";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { getAllFav, getAllPros } from "../../Store/Actions/Actions";
export default function Hiring() {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const professionals = useSelector((state) => state.pros);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [item, setItems] = useState([]);
  const getAllLincensesTypes = () => {
    // handleAPIRequest("get", "license-types", null).then((response) => {
    let response = {
      data: {
        license_types: [
          {
            id: 4,
            name: "Anesthesiologist Assistant",
            abbrev: "AA",
            description: null,
          },
          {
            id: 85,
            name: "Audiology Assistant",
            abbrev: "AI",
            description: null,
          },
          {
            id: 5,
            name: "Athletic Trainer",
            abbrev: "AL",
            description: null,
          },
          {
            id: 3,
            name: "Licensed Acupuncturist",
            abbrev: "AP",
            description: null,
          },
          {
            id: 1,
            name: "Advanced Practice Registered Nurses",
            abbrev: "APRN",
            description: "",
          },
          {
            id: 46,
            name: "Advanced Registered Nurse Practitioner",
            abbrev: "ARNP",
            description: null,
          },
          {
            id: 33,
            name: "Hearing Aid Specialist",
            abbrev: "AS",
            description: null,
          },
          {
            id: 83,
            name: "Audiologist",
            abbrev: "AY",
            description: null,
          },
          {
            id: 6,
            name: "Audiologist",
            abbrev: "AY",
            description: null,
          },
          {
            id: 7,
            name: "Audiologist",
            abbrev: "AZ",
            description: null,
          },
          {
            id: 36,
            name: "491 Board Approved CE Provider",
            abbrev: "BAP",
            description: null,
          },
          {
            id: 22,
            name: "491 Board Approved CE Provider",
            abbrev: "BAP",
            description: null,
          },
          {
            id: 32,
            name: "Emergency Insect Sting Treatment",
            abbrev: "BITE",
            description: null,
          },
          {
            id: 76,
            name: "Basic X-Ray Machine Operator",
            abbrev: "BMO",
            description: null,
          },
          {
            id: 9,
            name: "Chiropractic Physician",
            abbrev: "CH",
            description: null,
          },
          {
            id: 11,
            name: "Certified Chiropractic Physicians Assistant",
            abbrev: "CI",
            description: null,
          },
          {
            id: 21,
            name: "Certified Master Social Worker",
            abbrev: "CN",
            description: null,
          },
          {
            id: 8,
            name: "Certified Nursing Assistant",
            abbrev: "CNA",
            description: null,
          },
          {
            id: 49,
            name: "Clinical Nurse Specialist",
            abbrev: "CNS",
            description: null,
          },
          {
            id: 77,
            name: "General Radiographer",
            abbrev: "CRT",
            description: null,
          },
          {
            id: 24,
            name: "Dental Hygenist",
            abbrev: "DH",
            description: null,
          },
          {
            id: 12,
            name: "Clinical Lab Director",
            abbrev: "DI",
            description: null,
          },
          {
            id: 23,
            name: "Dentist",
            abbrev: "DN",
            description: null,
          },
          {
            id: 53,
            name: "Optician",
            abbrev: "DO",
            description: null,
          },
          {
            id: 25,
            name: "Dental Radiographer",
            abbrev: "DR",
            description: null,
          },
          {
            id: 39,
            name: "Diagnostic Radiological Physicist",
            abbrev: "DRP",
            description: null,
          },
          {
            id: 30,
            name: "Emergency Medical Technician",
            abbrev: "EMT",
            description: null,
          },
          {
            id: 29,
            name: "Electrologist",
            abbrev: "EO",
            description: null,
          },
          {
            id: 37,
            name: "Massage Therapist",
            abbrev: "MA",
            description: null,
          },
          {
            id: 38,
            name: "Medical Doctor",
            abbrev: "MD",
            description: null,
          },
          {
            id: 43,
            name: "Licensed Mental Health Counselor",
            abbrev: "MH",
            description: null,
          },
          {
            id: 42,
            name: "Medial Health Physicist",
            abbrev: "MHP",
            description: null,
          },
          {
            id: 41,
            name: "Medial Nuclear Radio Physicist",
            abbrev: "MNP",
            description: null,
          },
          {
            id: 34,
            name: "Licensed Marriage and Family Therapist",
            abbrev: "MT",
            description: null,
          },
          {
            id: 44,
            name: "Council of Midwifery",
            abbrev: "MW",
            description: null,
          },
          {
            id: 45,
            name: "Naturopathic Physician",
            abbrev: "NA",
            description: null,
          },
          {
            id: 28,
            name: "Nutrition Counselor",
            abbrev: "NC",
            description: null,
          },
          {
            id: 26,
            name: "Dietitian/Nutritionist",
            abbrev: "ND",
            description: null,
          },
          {
            id: 27,
            name: "Dietitian/Ntemporary Nutrition Counselor",
            abbrev: "NDT",
            description: null,
          },
          {
            id: 50,
            name: "Nursing Home Administrator",
            abbrev: "NH",
            description: null,
          },
          {
            id: 64,
            name: "Nuclear Pharmacist",
            abbrev: "NP",
            description: null,
          },
          {
            id: 58,
            name: "Orthotic Fitter Assistant",
            abbrev: "OFA",
            description: null,
          },
          {
            id: 54,
            name: "Optometrist",
            abbrev: "OP",
            description: null,
          },
          {
            id: 55,
            name: "Certified Optometrist",
            abbrev: "OPC",
            description: null,
          },
          {
            id: 56,
            name: "Orthotist",
            abbrev: "ORT",
            description: null,
          },
          {
            id: 60,
            name: "Orthotic Resident",
            abbrev: "ORTR",
            description: null,
          },
          {
            id: 61,
            name: "Osteopathic Physician",
            abbrev: "OS",
            description: null,
          },
          {
            id: 51,
            name: "Occupational Therapist",
            abbrev: "OT",
            description: null,
          },
          {
            id: 52,
            name: "Occupational Therapy Assistant",
            abbrev: "OTA",
            description: null,
          },
          {
            id: 68,
            name: "Physician Assistant",
            abbrev: "PA",
            description: null,
          },
          {
            id: 73,
            name: "Pedorthist",
            abbrev: "PED",
            description: null,
          },
          {
            id: 57,
            name: "Orthotic Fitter",
            abbrev: "PFR",
            description: null,
          },
          {
            id: 14,
            name: "Public Health Supervisor",
            abbrev: "PHAU",
            description: null,
          },
          {
            id: 13,
            name: "Public Health Director",
            abbrev: "PHDI",
            description: null,
          },
          {
            id: 15,
            name: "Public Health Technician",
            abbrev: "PHTC",
            description: null,
          },
          {
            id: 16,
            name: "Public Health Technologist",
            abbrev: "PHTN",
            description: null,
          },
          {
            id: 31,
            name: "Paramedic",
            abbrev: "PMD",
            description: null,
          },
          {
            id: 35,
            name: "Provisional Marriage and Family Therapist",
            abbrev: "PMT",
            description: null,
          },
          {
            id: 48,
            name: "Licensed Practical Nurse",
            abbrev: "PN",
            description: null,
          },
          {
            id: 69,
            name: "Podiatric Physician",
            abbrev: "PO",
            description: null,
          },
          {
            id: 59,
            name: "Prosthetist-Orthotist",
            abbrev: "POR",
            description: null,
          },
          {
            id: 71,
            name: "Prosthetist-Orthotist",
            abbrev: "POR",
            description: null,
          },
          {
            id: 72,
            name: "Prosthetist",
            abbrev: "PRO",
            description: null,
          },
          {
            id: 62,
            name: "Pharmacist",
            abbrev: "PSW",
            description: null,
          },
          {
            id: 20,
            name: "Licensed Clinical Social Worker",
            abbrev: "PSW",
            description: null,
          },
          {
            id: 66,
            name: "Physical Therapist",
            abbrev: "PT",
            description: null,
          },
          {
            id: 67,
            name: "Physical Therapist Assitant",
            abbrev: "PTA",
            description: null,
          },
          {
            id: 63,
            name: "Consultant Pharmacist",
            abbrev: "PU",
            description: null,
          },
          {
            id: 70,
            name: "Certified Podiatric X-Ray Assistant",
            abbrev: "PXA",
            description: null,
          },
          {
            id: 74,
            name: "Psychologist",
            abbrev: "PY",
            description: null,
          },
          {
            id: 75,
            name: "Radiologist Assistant",
            abbrev: "RA",
            description: null,
          },
          {
            id: 10,
            name: "Registered Chiropractic Assistant",
            abbrev: "RCA",
            description: null,
          },
          {
            id: 47,
            name: "Registered Nurse",
            abbrev: "RN",
            description: null,
          },
          {
            id: 65,
            name: "Registered Pharmacy Technician",
            abbrev: "RPT",
            description: null,
          },
          {
            id: 78,
            name: "Registered Respiratory Therapist",
            abbrev: "RT",
            description: null,
          },
          {
            id: 82,
            name: "Speech-Language Pathologist",
            abbrev: "SA",
            description: null,
          },
          {
            id: 84,
            name: "Speech-Language Pathologist Assistant",
            abbrev: "SI",
            description: null,
          },
          {
            id: 81,
            name: "School Psychologist",
            abbrev: "SS",
            description: null,
          },
          {
            id: 17,
            name: "Clinical Lab Supervisor",
            abbrev: "SU",
            description: null,
          },
          {
            id: 18,
            name: "Clinical Lab Technician",
            abbrev: "TC",
            description: null,
          },
          {
            id: 19,
            name: "Clinical Lab Technologist",
            abbrev: "TN",
            description: null,
          },
          {
            id: 40,
            name: "Therapeutic Radiological Physicist",
            abbrev: "TRP",
            description: null,
          },
          {
            id: 79,
            name: "Certified R.T. Technician",
            abbrev: "TT",
            description: null,
          },
          {
            id: 80,
            name: "Respiratory Care Practitioner by Exam",
            abbrev: "TUB",
            description: null,
          },
        ],
      },
    };
    let newArray = [];
    if (response.data.license_types) {
      response.data.license_types.map((item) => {
        newArray.push({
          ...item,
          value: item.id,
          label: item.name,
        });
      });

      setItems(newArray);
    }
    // });
  };

  useEffect(() => {
    setLoading(true);
    let favoritesData = {
      success: "User added to favorites",
      favorites: [
        {
          id: 35,
          is_admin: 0,
          type: "pro",
          uuid: "55f65c92-a55b-4def-9a83-d5cdbcdccd70",
          firstname: "Mathew",
          lastname: "Pro",
          email: "Mat@matbryant.com",
          email_verified_at: null,
          created_at: "2023-08-17T19:16:08.000000Z",
          updated_at: "2023-09-19T16:53:37.000000Z",
          status: "active",
          about_me: null,
          verified: "no",
          photo_url:
            "https://app.healthcare-up.com/public/profiles/64f1e78159ce3_image.jpg",
          fcm_token:
            "cAHH5UyQTGOz5IreW7Ljiv:APA91bGkX1TQirIbC7e6oYWx9_4sm7DaAdXCQw6JJsckyhlUKmC4CTQ_6-1epMzNt3ujkDrMIdVvsndtKR7m1HFU1m68pcPRtwJfnHlaLbbnn1eZ73zCGeAgzFRO4h8pF8U9jBondEkE",
          code: null,
          pivot: {
            user_id: 61,
            favorite_user_id: 35,
          },
        },
      ],
    };
    let prosData = [
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
    ];
    // getAllLincensesTypes();

    // handleAPIRequest("get", "favorites", null)
    //   .then((response) => {
    //     console.warn(response, "Helelelelelelele");

    //     dispatch(getAllFav(response.favorites));
    dispatch(getAllFav(favoritesData.favorites));

    handleAPIRequest("get", "pros", null)
      .then((response) => {
        if (response) {
          // console.warn(response);
          dispatch(getAllPros(response));
        }
      })
      .catch((e) => {});

    //           setFilteredData(response);
    setData(prosData);
    setFilteredData(prosData);
    setLoading(false);

    localStorage.setItem("User", JSON.stringify(prosData.user));
    //         }
    //       })
    //       .catch((e) => {
    //         setLoading(false);
    //       });
    //   })
    //   .catch((e) => {});
  }, [loading]);

  return (
    <>
      <div className=" bg-[#e5f0ff] pb-40 flex ">
        <h1 className="lg:text-4xl px-32 md:text-5xl text-3xl  font-bold leading-[1.3] md:!leading-[1.42] whitespace-nowrap">
          Healthcare professionals Ready to hire.
        </h1>
      </div>
      <div className="flex  -mt-28  flex-row w-full px-32">
        <div className="flex w-full bg-white  shadow-class p-14 rounded-2xl">
          <div className="">
            <Sidebar
              data={data}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          </div>

          {/* <div
              className="modal fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
              id="staticBackdrop"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div id="modal-body-content"></div>
                </div>
              </div>
            </div> */}
          <div className="pl-14 w-full">
            <div className="card-section-header flex justify-between items-center">
              <div className="flex gap-2">
                <p>Sort by:</p>
                <select
                  className="bg-blue-400 hover:bg-blue-500 transition-all ease-in-out duration-300 pr-1 !rounded-[2px] text-white"
                  value={filter}
                  onChange={(e) => setFilteredData(e.target.value)}
                >
                  <option>Hourly Rate</option>
                  <option>Daily Rate</option>
                </select>
              </div>

              {/* <div className="pagi-icons flex items-center">
                <IoIosArrowDropleft className="mr-2" />
                <IoIosArrowDropright />
              </div> */}
            </div>

            <div>
              <ProfessionalCard data={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
