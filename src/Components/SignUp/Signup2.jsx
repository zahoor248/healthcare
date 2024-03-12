import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { POST } from "../../Api/Post";
import { REGISTER } from "../../Api/EndPoints";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser } from "../../Store/Actions/Actions";
import Slide2 from "../../assets/images/slide2.png";
import { Link, useNavigate } from "react-router-dom";
import { getStates } from "../../Store/helper";
import { handleAPIRequest } from "../../helper/ApiHandler";
import { FaLessThanEqual } from "react-icons/fa6";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [registrationStep, setRegistrationStep] = useState(1);

  const [userType, setUserType] = useState("pro");

  const [licenseTyes, setLicenseType] = useState([]);

  const [adressDetails, setAdressDetails] = useState({
    streetAddress: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    status: "active",
  });

  const [licenseDetails, setLicenseDetails] = useState({
    licenseType: "",
    licenseState: "",
    license_id: "",
    verified: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const registrationHandler = async () => {
    // error handling
    if (
      firstName == "" ||
      lastName == "" ||
      phoneNumber == "" ||
      email == "" ||
      password.password == ""
    ) {
      setError("Please fill the above fields");
      return;
    }
    if (password.password != password.password_to_confirm) {
      setError("Password does not match");
      return;
    }

    setLoading(true);
    let data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phoneNumber,
      password: password.password,
      type: userType,
    };
    console.log(data);
    POST(data, REGISTER, "post")
      .then((response) => {
        setError("");
        setRegistrationStep(2);
        setLoading(false);
        dispatch(setUser(response.user));
        localStorage.setItem("token", response?.user?.token);
        dispatch(setUser(response.user));
        dispatch(setIsLoggedIn(true));
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error?.response?.data?.data);
      });
  };

  const handleUserType = (value) => {
    setUserType(value);
  };

  const handleMoreInformation = (value) => {
    if (
      adressDetails.streetAddress == "" ||
      adressDetails.address == "" ||
      adressDetails.city == "" ||
      adressDetails.state == "" ||
      adressDetails.zip == "" ||
      licenseDetails.licenseType == "" ||
      licenseDetails.licenseState == "" ||
      licenseDetails.license_id == ""
    ) {
      setError("Please fill the above fields");
      return;
    }

    setLoading(true);
    let payload = {
      user_id: user.id,
      address_1: adressDetails.streetAddress,
      address_2: adressDetails.address,
      city: adressDetails.city,
      state: adressDetails.state,
      zip: adressDetails.zip,
      status: "active",
      address: true,
      license: userType == "pro" ? true : false,
      license_type: licenseDetails.licenseType,
      license_state: licenseDetails.licenseState,
      license_id: licenseDetails.license_id,
    };
    handleAPIRequest("POST", `register2/${user.uuid}`, payload)
      .then((response) => {
        dispatch(setUser(response.user));
        dispatch(setIsLoggedIn(true));
        setLoading(false);
        // navigate(`/?varified=${user.type == "pro" ? true : false}`);
      })
      .catch((error) => {
        console.log(error);
        // navigate(`/?varified=${user.type == "pro" ? true : false}`);
        setLoading(false);
        setError(error?.response?.data?.data);
      });
  };

  const getAllLincensesTypes = () => {
    let newArray = [];

    [
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
    ].forEach((item) => {
      const name = item.name;

      // Check if the name is not already in newArray
      const isDuplicate = newArray.some(
        (existingItem) => existingItem.label === name
      );

      if (!isDuplicate) {
        newArray.push({
          ...item,
          value: item.id,
          label: name,
        });
      }
    });

    setLicenseType(newArray);
  };

  useEffect(() => {
    getAllLincensesTypes();
  }, []);
  const getTypeById = (id) => {
    let newValue = itemsLicense.filter((item) => item.id === id);
    console.warn(newValue);
    return newValue[0] ? newValue[0].name : "";
  };

  return (
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
              Pulvinar elementum integer enim neque. Et netus et malesuada fames
              ac turpis. Lectus nulla at volutpat diam ut.
            </p>
          </div>
        </div>

        <div className="h-full w-full md:w-[90%] md:p-12  overflow-auto p-6 lg:p-24 ">
          {registrationStep == 2 ? (
            <div class="">
              <Link
                class="absolute md:relative  top-6 left-4 md:top-0 md:left-0 md:flex pb-4 space-x-1 items-center transition-all ease-in-out duration-300 hover:text-primary"
                to="/"
              >
                <div class="flex gap-1 items-center hover:text-primary  transition-colors duration-300 ease-in-out   cursor-pointer font-sm font-normal text-white md:text-neutral-600 underline leading-normal -ml-2">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0007 6.33398L8.83398 10.5007L13.0007 14.6673"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <p class="-ml-1 -mt-1 text-lg">Back</p>
                </div>
              </Link>
              <p class="text-2xl lg:text-3xl leading-normal font-bold">
                Create a new account.
              </p>
              <p class="text-sm leading-normal figtree-font text-neutral-900">
                Let's start a new journey together, sign up now.
              </p>

              <div className=" mt-4 text-neutral-600 ">
                Step {registrationStep} of 2
              </div>
            </div>
          ) : (
            <p class="text-2xl lg:text-3xl leading-normal font-bold">
              Add More Information.
            </p>
          )}

          {registrationStep == 1 && (
            <div>
              <div className="py-3">
                Please enter your primary business address. We'll use this to
                validate your business and it will be shared with any candidates
                you look to hire.
              </div>

              <div className="flex flex-col bg-neutral-100 p-6 gap-4 w-full rounded-xl">
                <div className="font-semibold text-lg">Adress Details</div>
                <div className="flex flex-col gap-2">
                  <p className="text-base/none font-normal text-neutral-600">
                    Street Address
                  </p>
                  <input
                    className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                    label="Address"
                    placeholder="Enter your address"
                    variant="outlined"
                    value={adressDetails.streetAddress}
                    onChange={(e) =>
                      setAdressDetails({
                        ...adressDetails,
                        streetAddress: e.target.value,
                      })
                    }
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
                    value={adressDetails.address}
                    onChange={(e) =>
                      setAdressDetails({
                        ...adressDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-base/none font-normal text-neutral-600">
                      State
                    </p>
                    <select
                      value={adressDetails.state}
                      onChange={(e) =>
                        setAdressDetails({
                          ...adressDetails,
                          state: e.target.value,
                        })
                      }
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
                  <div className="flex flex-col gap-2 w-full">
                    <p className="text-base/none font-normal text-neutral-600">
                      City
                    </p>
                    <input
                      className="text-lg placeholder-[#B8C0CB] text-neutral-800 py-3 px-4 border border-[#C2C9D4] rounded w-full"
                      label="City"
                      placeholder="Enter your City"
                      variant="outlined"
                      value={adressDetails.city}
                      onChange={(e) =>
                        setAdressDetails({
                          ...adressDetails,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
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
                    value={adressDetails.zip}
                    onChange={(e) =>
                      setAdressDetails({
                        ...adressDetails,
                        zip: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* <hr className="w-[60%] m-auto justify-center flex justify-self-end bg-neutral-200"></hr> */}

              {userType == "pro" && (
                <div className="flex flex-col gap-4 w-full bg-neutral-100 p-6 mt-4 rounded-xl">
                  <div className="font-semibold text-lg">License Details</div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base/none font-normal text-neutral-600">
                      License Type
                    </p>
                    <select
                      value={licenseDetails.licenseType}
                      onChange={(e) =>
                        setLicenseDetails({
                          ...licenseDetails,
                          licenseType: e.target.value,
                        })
                      }
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
                      value={licenseDetails.licenseState}
                      onChange={(e) =>
                        setLicenseDetails({
                          ...licenseDetails,
                          licenseState: e.target.value,
                        })
                      }
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
                      value={licenseDetails.license_id}
                      onChange={(e) =>
                        setLicenseDetails({
                          ...licenseDetails,
                          license_id: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="pt-10 w-full relative">
            <span className="absolute bottom-16 text-red-600 text-sm">
              {error}
            </span>
            <button
              className="bg-[#10274F] text-white w-full py-3 rounded-xl transition-all ease-in-out duration-500 hover:bg-[#0d2041] hover:shadow-lg border hover:border hover:border-[#10274F]"
              onClick={() => handleMoreInformation()}
            >
              {loading ? "Please Wait..." : "Finish Registration"}
            </button>

            {/* <GoogleLogin
          clientId="434301795138-h0tqvj6l17t1a6kbi4gc0kh343r1980d.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button className="signin-btn" onClick={renderProps.onClick}>
              <img src={GoogleIcon} alt="Google Logo" />
              Sign in with Google
            </button>
          )}
        /> */}
          </div>

          <div className=" pt-4">
            <p>
              Already have an account,{" "}
              <Link
                to="/login"
                className="px-2 text-blue-600 hover:text-blue-700 transition-all ease-in-out duration-500 cursor-pointer"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
