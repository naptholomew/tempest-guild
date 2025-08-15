import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-skin-base text-skin-base bg-storm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:m-2 focus:p-2 focus:rounded-md focus:bg-black/30">
        Skip to content
      </a>
      <div className="flex">
        <Sidebar />
        <main id="main" className="flex-1 min-w-0">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="space-y-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
