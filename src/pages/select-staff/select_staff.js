import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StaffCard from "./components/staff_card";
import { selectedServices as selectedServicesSelector } from "../../features/booking/bookingSlice";

export default function SelectStaff() {
  const selectedServices = useSelector(selectedServicesSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedServices.length == 0) {
      return navigate("/");
    }
    let allowedStaffs = [];
    if (selectedServices[0]) {
      selectedServices[0].allowed_staff.forEach((staff) =>
        allowedStaffs.push({
          id: staff.id,
          title: staff.name,
          rating: 4.5,
        })
      );
      setStaff(allowedStaffs);
    }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const [staff, setStaff] = useState([]);

  return (
    <div
      style={{
        fontFamily: "roboto, sans-serif",
        fontSize: 15,
        backgroundColor: "#fff",
      }}
    >
      <div className="w-screen sticky bg-[rgb(16,25,40)]">
        <div className="w-[90%] mx-auto flex items-center h-20 justify-between">
          <div className="flex items-center gap-x-4">
            <Link to="/">
              <FontAwesomeIcon icon={solid("chevron-left")} color={"white"} />
            </Link>
            <span className="text-white font-bold text-xl">Select Staff</span>
          </div>
          <button>
            <FontAwesomeIcon icon={solid("xmark")} size="xl" color={"white"} />
          </button>
        </div>
      </div>
      {staff.length > 0 && staff.map((s) => <StaffCard key={s.id} staff={s} />)}
    </div>
  );
}
