import React from "react";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div>
      <header >{/* header component */}</header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* footer component */}
      </footer>
    </div>
  );
}

