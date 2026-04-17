import React, { useEffect, useState } from "react";
import "./style/over.scss";
import axios from "axios";

export default function Overview() {
  const [data, setdata] = useState([]);
  const [stat,setStats] = useState([])
  const url = process.env.REACT_APP_BACK_URL;
  const handelGetover = async () => {
    const res = await axios.get(url+"/api/v2/get-ov-dt",        {
          withCredentials: true,
        });
    if (res.data) {
      setdata(res.data.users);
      setStats(res.data)
    }
  };
  useEffect(() => {
    handelGetover()
  }, []);
  const stats = [
    { label: "Total Users", value:stat.totalUsers, trend: "+24 today" },
    { label: "Pending Approval", value: stat.totalpandingUser, trend: "Requires review" },
    // { label: "Active Managers", value: "12", trend: "Across 4 regions" },
    // { label: "System Load", value: "98%", trend: "Optimal" },
  ];


  return (
    <div className="overview-container">
      <div className="overview-main">
        <div className="header">
          <h1>User Management</h1>
        </div>

        {/* Responsive Stats Grid */}
        <section className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="label">{stat.label}</span>
              <div className="value">{stat.value}</div>
              <span className="trend">{stat.trend}</span>
            </div>
          ))}
        </section>

        {/* Responsive Table Container */}
        <div className="table-container">
          <div className="table-header">Recently Added Users</div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Access Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user,index) => (
                <tr key={index}>
                  <td>
                    <strong>{user.user_name}</strong>
                  </td>
                  <td>{user.user_email}</td>
                  <td>
                    <span className="role-tag">{user.user_role}</span>
                  </td>
                  <td>
                    <span className={`status-dot ${user.is_active}`}></span>
                        {user.is_active ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
