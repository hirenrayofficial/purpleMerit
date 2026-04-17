import React, { useState } from "react";
import "./style/header.scss";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPersonGear } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../../utils/auth";

export default function Header() {
  const url = process.env.REACT_APP_BACK_URL;

  const userData = getUser();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handelOpen = () => {
    if (open == false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handelLogout = async () => {
    const res = await axios.post(url + "/api/v1/log-out");
    if (res) {
      Cookies.remove("user");
      Cookies.remove("userauth");
      navigate("/");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="header-main">
      <div className="header-container">
        <div className="left">Dashboard</div>
        <div className="right">
          {/* avtar section */}
          <div className="avtar-main">
            <div className="av-name-lg">
              <span>{userData?.name.slice(0, 1) || <BsPersonGear />}</span>
            </div>
            <div className="av-dt" onClick={handelOpen}>
              <span>{userData?.name || "User Name"}</span>
              <span id="a">{userData?.role || "user_name"}</span>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="open-main">
          <div className="button-s">
            <div className="bt-a">
              <button>Profile</button>
            </div>
            <div className="bt-b" onClick={handelLogout}>
              <button>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
