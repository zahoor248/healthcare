import React from "react";

import "./index.css";
function ListingComponent() {
  return (
    <>
      <section className="listing-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="listing-banner">
                <h2>Healthcare Professionals Ready to Hirexx.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="listing-area">
        <div className="container">
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
                  <div id="details-area" className="details-area"></div>
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
