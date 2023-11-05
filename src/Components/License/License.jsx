import React from "react";
import "./License.css";
import { HiDocumentText } from "react-icons/hi";
import TextField from "@mui/material/TextField";
import { RiDeleteBin2Fill } from "react-icons/ri";
import LicenseExpire from "../LicenseExpire/LicenseExpire";

export default function License() {
  return (
    <>
      <div className="profile-editing-section">
        <div className="profile-editing-header">
          <HiDocumentText className="edit-box-icon" />
          <p className="my-profile-text">License</p>
        </div>

        <div className="license-editing-card">
          <div className="license-container">
            <div className="profile-fields">
              <div className="license-fields-container">
                <select className="license-state-type">
                  <option>State Type</option>
                  <option>Lorem</option>
                  <option>Ipsum</option>
                </select>

                <select className="license-state-type">
                  <option>License Type</option>
                  <option>Lorem</option>
                  <option>Ipsum</option>
                </select>

                <TextField
                  className="license-input"
                  label="ID"
                  variant="outlined"
                />
                <div className="license-picker">
                  <LicenseExpire />
                </div>
              </div>
            </div>
            <div className="license-btn-container">
              <button>+ Add License</button>
            </div>
          </div>

          <div className="license-container2">
            <h3 className="license-heading">Licenses</h3>

            <div className="license-list-header">
              <p className="sr-container">Sr.No</p>
              <p className="lic-container">License Type</p>
              <p className="state-container">State Type</p>
              <p className="id-container">ID</p>
              <p className="expire-container">Expiration</p>
            </div>

            <div className="license-detail">
              <div>
                <p className="license-tbl-header">1</p>
              </div>
              <div>
                <p className="license-tbl-header">MBBS</p>
              </div>
              <div>
                <p className="license-tbl-header">Lorem</p>
              </div>
              <div>
                <p className="license-tbl-header">0001</p>
              </div>
              <div>
                <p className="license-tbl-header">31st January 2023</p>
              </div>
              <div>
                <button className="license-edit-btn">Edit</button>
              </div>
              <div>
                <RiDeleteBin2Fill className="license-del" />
              </div>
            </div>

            <div className="license-detail2">
              <div>
                <p className="license-tbl-header">2</p>
              </div>
              <div>
                <p className="license-tbl-header">MBBS</p>
              </div>
              <div>
                <p className="license-tbl-header">Lorem</p>
              </div>
              <div>
                <p className="license-tbl-header">0001</p>
              </div>
              <div>
                <p className="license-tbl-header">31st January 2023</p>
              </div>
              <div>
                <button className="license-edit-btn">Edit</button>
              </div>
              <div>
                <RiDeleteBin2Fill className="license-del" />
              </div>
            </div>

            <div className="license-detail">
              <div>
                <p className="license-tbl-header">3</p>
              </div>
              <div>
                <p className="license-tbl-header">MBBS</p>
              </div>
              <div>
                <p className="license-tbl-header">Lorem</p>
              </div>
              <div>
                <p className="license-tbl-header">0001</p>
              </div>
              <div>
                <p className="license-tbl-header">31st January 2023</p>
              </div>
              <div>
                <button className="license-edit-btn">Edit</button>
              </div>
              <div>
                <RiDeleteBin2Fill className="license-del" />
              </div>
            </div>

            <div className="license-detail2">
              <div>
                <p className="license-tbl-header">4</p>
              </div>
              <div>
                <p className="license-tbl-header">MBBS</p>
              </div>
              <div>
                <p className="license-tbl-header">Lorem</p>
              </div>
              <div>
                <p className="license-tbl-header">0001</p>
              </div>
              <div>
                <p className="license-tbl-header">31st January 2023</p>
              </div>
              <div>
                <button className="license-edit-btn">Edit</button>
              </div>
              <div>
                <RiDeleteBin2Fill className="license-del" />
              </div>
            </div>

            <div className="license-btn-container2">
              <button>Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
