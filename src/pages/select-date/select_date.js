import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fadeIn, fadeOut } from "react-animations";
import Radium, { StyleRoot } from "radium";
import moment from "moment";
import { Link } from "react-router-dom";

export default function SelectDate() {
  const [showDateCalendar, setShowDateCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimings, setAvailableTimings] = useState([
    {
      time: "4:30 AM",
    },
    {
      time: "12:30 PM",
    },
    {
      time: "2:30 PM",
    },
    {
      time: "4:30 PM",
    },
  ]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setShowDateCalendar(false);
  };

  const styles = {
    fadeIn: {
      animation: "x .3s",
      animationName: Radium.keyframes(fadeIn, "fadeInUp"),
    },
    fadeOut: {
      animation: "x .3s",
      animationName: Radium.keyframes(fadeOut, "fadeOut"),
    },
  };

  const DateTile = (props) => {
    const {
      timing: { time },
    } = props;
    return (
      <Link to="/confirm-number">
        <div className="w-screen cursor-pointer hover:bg-[rgb(242,242,242)] transition ease-in-out duration-300 delay-0">
          <div className="w-[90%] h-24 mx-auto flex items-center justify-between gap-x-6 border-b">
            <div className="font-bold">{time}</div>
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
            <Link to="/select-staff">
              <FontAwesomeIcon icon={solid("chevron-left")} color={"white"} />
            </Link>
            <span className="text-white font-bold text-xl">
              Select Date with STAFF
            </span>
          </div>
          {/* <button>
            <FontAwesomeIcon icon={solid("xmark")} size="xl" color={"white"} />
          </button> */}
        </div>
        <div className="h-20 w-screen bg-white drop-shadow-md flex justify-center">
          <div className="w-[90%] bg-white h-full flex items-center justify-between">
            <div className="grow">
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.setDate(selectedDate.getDate() - 1))
                  )
                }
              >
                <FontAwesomeIcon icon={solid("chevron-left")} color={"black"} />
              </button>
            </div>
            <div
              className="grow text-center cursor-pointer"
              onClick={() => setShowDateCalendar(!showDateCalendar)}
            >
              {moment(selectedDate).format("dddd, Do MMMM YYYY")}
            </div>
            <div className="grow text-end">
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(selectedDate.setDate(selectedDate.getDate() + 1))
                  )
                }
              >
                <FontAwesomeIcon
                  icon={solid("chevron-right")}
                  color={"black"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDateCalendar && (
        <StyleRoot>
          <div
            className="w-96 h-80 bg-white fixed left-[50%] ml-[-196px] mt-2 rounded-2xl flex justify-center shadow-2xl"
            style={styles.fadeIn}
          >
            <Calendar
              date={selectedDate}
              onChange={handleDateChange}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
            />
          </div>
        </StyleRoot>
      )}
      {availableTimings.length > 0 &&
        availableTimings.map((timing) => <DateTile timing={timing} />)}
    </div>
  );
}
