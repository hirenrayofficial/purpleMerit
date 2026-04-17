import React, { useState } from "react";
import "./style/login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [Eerror, setEerror] = useState("");
  const [Perror, setPerror] = useState("");


  const url = process.env.REACT_APP_BACK_URL;
  const key = process.env.REACT_APP_SECRET_KEY;

  const navigate = useNavigate();

  const dcryptDetails = (token) => {
    const dcrypt = jwtDecode(token, key);
    return dcrypt;
  };

  const handelSubmit = async () => {
    if (!email) {
      setEerror("Please enter a valid input");
      return;
    } else {
      setEerror("");
    }

    if (!pass) {
      setPerror("Please enter a valid input");
      return;
    } else {
      setPerror();
    }
    const payload = {
      email,
      pass,
    };
    const res = await axios.post(
      url + "/api/v1/check-user",
      {
        payload,
      },
      {
        withCredentials: true,
      },
    );
    if (res.data.status === 200) {
      setError(res.data.message);
      const dcryptData = dcryptDetails(res.data.token);
      console.log(dcryptData);

      Cookies.set("userauth", res.data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });
      navigate(`/dashboard?id=${dcryptData.uuid}&role=${dcryptData.role}&token=${res.data.token}`);
    } else if (res.data.status === 404) {
      setError(res.data.error);
    } else if (res.data.status === 500) {
      setError(res.data.error);
    } else {
      setError("");
    }
    // console.log(res);
  };
  return (
    <div className="login-main">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <div className="input-s">
            <label htmlFor="">Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <div className="error">{Eerror || error}</div>
          </div>
          <div className="input-s">
            <label htmlFor="">Password</label>
            <input
              value={pass}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="error">{Perror}</div>
          </div>
          <button className="login-btn" onClick={handelSubmit}>
            Login
          </button>
        </div>
        <div className="other-links">
          <span>
            If you are not create account so Click{" "}
            <a href="/signin">Signin now</a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
