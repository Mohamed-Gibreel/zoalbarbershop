import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full h-10v flex bg-black justify-between items-center pl-10 pr-10">
      <div className="text-white flex justify-center items-center uppercase text-xs">
        Zool
        <br /> barbershop
      </div>
      <div>
        <ul>
          <li className="inline text-white mr-4 text-xs">Home</li>
          <li className="inline text-white text-xs">Service List</li>
        </ul>
      </div>
    </nav>
  );
}
