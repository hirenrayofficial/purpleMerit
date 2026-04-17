import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../dashboard/Header";
import Tabbar from "../dashboard/Tabbar";

export default function DashboardLayout({urlId,urlRole,urlToken}) {
  return (
    <div>
      <header>
        {/* header component */}
        <Header />
      </header>
      <main>
        {/* dashboard content */}
        <Outlet  />
      </main>
      <footer>
        <Tabbar uId={urlId} urlRole={urlRole} urlToken={urlToken} />
      </footer>
    </div>
  );
}
