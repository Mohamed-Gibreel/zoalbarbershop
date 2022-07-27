import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

export default function SelectStaff() {
  const [staff, setStaff] = useState([
    {
      id: "1",
      title: "Adil Gibreel",
      rating: 4.5,
    },
    {
      id: "2",
      title: "Mohamed Gibreel",
      rating: 2.5,
    },
    {
      id: "3",
      title: "Husam Gibreel",
      rating: 4.5,
    },
    {
      id: "4",
      title: "Ghassan Gibreel",
      rating: 3.5,
    },
  ]);
  const StaffCard = (props) => {
    const {
      staff: { title, description, rating },
    } = props;
    return (
      <Link to="/select-date">
        <div className="w-screen cursor-pointer hover:bg-[rgb(242,242,242)] transition ease-in-out duration-300 delay-0">
          <div className="w-[90%] mx-auto h-24 flex items-center gap-x-6 border-b">
            <div className="h-[56px] w-[56px] bg-red-50 rounded-full"></div>
            <div className="flex grow">
              <div className="flex flex-col grow">
                <span className="font-bold text-lg">
                  {title ?? "Zool Mohammed"}
                </span>
                <span className="font-normal text-secondary-grey">
                  {description ?? "Expert in all hair types"}
                </span>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={solid("star")} color={"#FFC831"} />
              <span className="pl-2 font-bold text-lg">{rating ?? "4.5"}</span>
            </div>
            <FontAwesomeIcon icon={solid("chevron-right")} color={"black"} />
          </div>
        </div>
      </Link>
    );
  };
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
          {/* <button>
            <FontAwesomeIcon icon={solid("xmark")} size="xl" color={"white"} />
          </button> */}
        </div>
      </div>
      <div>{staff.length > 0 && staff.map((s) => <StaffCard staff={s} />)}</div>
    </div>
  );
}
