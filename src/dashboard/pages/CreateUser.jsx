import React, { useState } from "react";
import "../style/create.scss";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function CreateUser() {
  const url = process.env.REACT_APP_BACK_URL;

  const [search] = useSearchParams()
  const id = search.get("id")



  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [Eerror, setEerror] = useState("");
  const [Nerror, setNerror] = useState("");
  const [Perror, setPerror] = useState("");

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

  const payload = {
    id,
    email,
    name: username,
    username: nameGenretor(username),
    pass,
    role
  };
  const handleSub = async () => {
    const res = await axios.post(url+"/api/v2/create-user", { payload });
    if (res.data.status === 200) {
      alert(res.data.message);
      setEmail("")
      setPass("")
      setUsername("")
      setRole("")
    }else{
      alert(res.data.error)
    }
  };
  const getRole = ()=>{
    alert(role)
  }

  return (
    <div className="full-page-containera">
      <div className="content-wrapper">
        <header className="page-header">
          <h1>Create New System User</h1>
          <p>Register a new user and assign system-wide permissions</p>
        </header>

        <form className="form-section" onSubmit={(e) => e.preventDefault()}>
          {/* Row 1 */}
          <div className="input-box">
            <label>Full Name</label>
            <input
              name="fullname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John"
            />
          </div>

          {/* Row 2 */}
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              name="email"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="example@123"
            />
          </div>

          <div className="input-box">
            <label>User Role</label>
            <select
              name="role"
              onChange={(e) => setRole(e.target.value)}
            >
              <option >Select Role</option>
              <option value="user">Standard User</option>
              <option value="manager">Manager</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
        </form>

        <div className="action-bar">
          <button className="btn btn-secondary" onClick={getRole}>Discard Changes</button>
          <button className="btn btn-primary" onClick={handleSub}>Create User</button>
        </div>
      </div>
    </div>
  );
}
