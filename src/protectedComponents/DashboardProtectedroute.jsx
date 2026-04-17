import React from "react";

import { Navigate, useSearchParams } from "react-router-dom";

import { getToken, getUser } from "../utils/auth";
export default function DashboardProtectedroute({children}) {
  const userCookie = getToken();
  let isAuthenticated = false;
  const key = process.env.REACT_APP_SECRET_KEY;

  const [searchPrams] = useSearchParams();
  const id = searchPrams.get("id");
  const role = searchPrams.get("role");
  const token = searchPrams.get("token");

  try {
    const decodedCookie = getUser();

    if (
      decodedCookie.role === role &&
      decodedCookie.uuid === id &&
      userCookie === token
    ) {
      isAuthenticated = true;
    }
  } catch (e) {
    console.error("Cookie parsing error:", e);
    isAuthenticated = false;
  }
  const dashboardProps = {
    urlId: id,
    urlRole: role,
    urlToken: token
  };

  return isAuthenticated ? React.cloneElement(children, dashboardProps) : <Navigate to="/" replace />;
}
