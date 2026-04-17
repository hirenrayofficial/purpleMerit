import React, { useState } from "react";
import "./style/signin.scss";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [Eerror, setEerror] = useState("");
  const [Nerror, setNerror] = useState("");
  const [Perror, setPerror] = useState("");


  const url = process.env.REACT_APP_BACK_URL;

  const nameGenretor = (username) => {
    const genrate = username
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_") // Replace spaces with -
      .replace(/[^a-z0-9_]/g, "") // Remove all non-word chars
      .replace(/__+/g, "-");
    const num = genrate + "_" + Math.floor(1000 + Math.random() * 9000);
    return num;

  };


  const handelSubmit = async () => {
    if (!email) {
      setEerror("Please enter a valid input");
      return;
    } else {
      setEerror("");
    }
    if (!username) {
      setNerror("Please enter a valid input");
      return;
    } else {
      setNerror("");
    }
    if (!pass) {
      setPerror("Please enter a valid input");
      return;
    } else {
      setPerror();
    }
    const payload = {
      email,
      name:username,
      username:nameGenretor(username),
      pass,
    };
    const res = await axios.post(url + "/api/v1/set-admin", {
      payload,
    });
    alert(res.data.status);
    if (res.data.status === 200) {
      setError(res.data.message);
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
    <div className="signin-main">
      <div className="signin-container">
        <h1>Sign In</h1>
        <div className="signin-form">
          <div className="input-s">
            <label htmlFor="">Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <div className="error" >{Eerror || error}</div>
          </div>
          <div className="input-s">
            <label htmlFor="">Name</label>
            <input
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Name"
            />
            <div className="error">{Nerror}</div>
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
          <button className="signin-btn" onClick={handelSubmit}>
            Sign In
          </button>
        </div>
        <div className="other-links">
          <span>
            If you are alreadu create account so Click{" "}
            <a href="/login">Login now</a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
