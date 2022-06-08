import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";
import UsePut from "../../Utilities/UsePut";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
// import { dispatch } from "react-hot-toast/dist/core/store";
import { toast } from "react-hot-toast";
import { refreshState } from "../../redux/users/actions";
const axios = require("axios");

function UserProfile() {
  // const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  // const [userDetails, setUserDetails] = useState({
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   phone_number: "",
  // });

  // useEffect(async () => {
  //   const user = JSON.parse(localStorage.getItem("user")) || null;
  //   dispatch(refreshState({ user }));
  //   // const response = await fetch("/user/" + userId, { method: "GET" });
  //   // // console.log("response : " + response);
  //   // let data1 = await response.json();
  //   // console.log("data1 : " + JSON.stringify(data1["data"]));
  //   // setUserDetails(data1["data"]);
  //   // console.log("user details : " + JSON.stringify(userDetails));
  // }, [dispatch]);
  // console.log(userDetails[0]["first_name"]);

  const { loggedInUser: data } = useSelector(selectUser);
  useEffect(() => {
    setUserDetails(data);
  }, [data]);
  // console.log("first name: " + data?.first_name);
  console.log(userDetails);

  async function handleSubmit() {
    const response = await UsePut(
      "/user/" + userDetails?.id,
      userDetails,
      "PUT"
    );
    if (response?.success) {
      // console.log("hell yes");
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(userDetails));
      toast.success(response?.data);
    } else {
      console.log("hell nooo : " + response?.message);
      toast.error(response?.message);
    }
  }
  return (
    <>
      {userDetails == null ? (
        ""
      ) : (
        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img alt =""
                  class="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                {/* <span class="font-weight-bold">Rikin Chauhan</span> */}
                <span class="font-weight-bold">
                  {userDetails?.first_name + " " + userDetails?.last_name}
                </span>
                {/* <span class="text-black-50">rikin01@gmail.com</span> */}
                <span class="text-black-50">{userDetails?.email}</span>
                {/* <span></span> */}
              </div>
            </div>
            <div class="col-md-9 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="First name"
                      // placeholder="Rikin"
                      value={userDetails?.first_name}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          first_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="labels">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="Last name"
                      // placeholder="Chauhan"
                      value={userDetails?.last_name}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          last_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="Mobile number"
                      // placeholder="1234567890"
                      value={userDetails?.phone_number}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          phone_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {/* <div class="col-md-12">
                  <label class="labels">Address Line 1</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 1"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Address Line 2</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Postcode</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">State</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Area</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div> */}
                  <div class="col-md-12">
                    <label class="labels">Email ID</label>
                    <input
                      type="text"
                      class="form-control"
                      // placeholder="Email id"
                      // placeholder="rikin01@gmail.com"
                      value={userDetails?.email}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* <div class="row mt-3">
                <div class="col-md-6">
                  <label class="labels">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="country"
                    value=""
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">State/Region</label>
                  <input
                    type="text"
                    class="form-control"
                    value=""
                    placeholder="state"
                  />
                </div>
              </div> */}
                <div class="mt-5 text-center">
                  <button
                    class="btn btn-primary profile-button"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
            {/* <div class="col-md-4">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center experience">
                <span>Edit Experience</span>
                <span class="border px-3 p-1 add-experience">
                  <i class="fa fa-plus"></i>&nbsp;Experience
                </span>
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Experience in Designing</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="experience"
                  value=""
                />
              </div>
              <br />
              <div class="col-md-12">
                <label class="labels">Additional Details</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="additional details"
                  value=""
                />
              </div>
            </div>
          </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
