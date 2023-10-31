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
  const [data, setData] = useState(professionals);
  const [filteredData, setFilteredData] = useState(professionals);
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
    handleAPIRequest("get", "pros", null)
      .then((response) => {
        if (response) {
          // console.warn(response);
          dispatch(getAllPros(response));
        }
      })
      .catch((e) => {});

    getAllLincensesTypes();

    handleAPIRequest("get", "favorites", null)
      .then((response) => {
        console.warn(response, "Helelelelelelele");
        dispatch(getAllFav(response.favorites));
      })
      .catch((error) => {});
    setData(professionals);
    setFilteredData(professionals);       
  }, []);

  return (
    <>
      <div className=" bg-[#e5f0ff] pb-40 flex ">
        <h1 className="xl:text-4xl px-6 xl:px-32 md:text-2xl text-3xl  font-bold leading-[1.3] md:!leading-[1.42] whitespace-nowrap">
          Healthcare professionals Ready to hire.
        </h1>
      </div>
      <div className="flex -mt-32 xl:-mt-28  flex-row w-full px-6 xl:px-24 2xl:px-32">
        <div className="flex w-full bg-white  shadow-class p-4 lg:p-8 xl:p-14 rounded-2xl">
          <div className="">
            <Sidebar
              data={data}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          </div>
          <div className="xl:pl-14 lg:pl-10 pl-6 w-full">
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
