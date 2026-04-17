import React from "react";
import { useAuth } from "../context/AuthProvider";
import Overview from "./Overview";

export default function Dashboard() {
  const { roles } = useAuth();

  if (roles === "admin" || roles === "manager") {
    // alert("Hi");
    return <Overview />;
  } else if (roles === "user") {
    return (
      <div
        className="dash-main"
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="das-container" style={{ textAlign: "center" }}>
          <h1>Hii User</h1>
          <span>
            You are a user so you can't access any feature you use only profile
            page
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="dash-main"
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>Loading</div>
      </div>
    );
  }
}
