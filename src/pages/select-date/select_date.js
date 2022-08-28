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
import DateTile from "./components/date_tile";
import {
  selectedStaff as selectedStaffSelector,
  selectedServices as selectedServicesSelector,
} from "../../features/booking/bookingSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SelectDate() {
  const [showDateCalendar, setShowDateCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimings, setAvailableTimings] = useState([
    {
      time: selectedDate,
    },
    {
      time: selectedDate,
    },
    {
      time: selectedDate,
    },
    {
      time: selectedDate,
    },
  ]);

  const navigate = useNavigate();
  const selectedServices = useSelector(selectedServicesSelector);

  function returnTimesInBetween(start, end) {
    var timesInBetween = [];

    var startH = parseInt(start.split(":")[0]);
    var startM = parseInt(start.split(":")[1]);
    var endH = parseInt(end.split(":")[0]);
    var endM = parseInt(end.split(":")[1]);

    if (startM == 30) startH++;

    for (var i = startH; i < endH; i++) {
      timesInBetween.push(i < 10 ? "0" + i + ":00" : i + ":00");
      timesInBetween.push(i < 10 ? "0" + i + ":30" : i + ":30");
    }

    timesInBetween.push(endH + ":00");
    if (endM == 30) timesInBetween.push(endH + ":30");

    // return timesInBetween.map(getGenTime);
    return timesInBetween;
  }

  let getGenTime = (timeString) => {
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 ? " AM" : " PM";
    return (timeString = h + timeString.substr(2, 3) + ampm);
  };

  const getDates = () => {
    let fromtime = "8:00:00";
    let totime = "16:00:00";
    let finalDates = [];
    returnTimesInBetween(fromtime, totime).forEach((date) => {
      //TODO: Check if time lands between any booked slots
      var d = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          parseInt(date.split(":")[0]),
          parseInt(date.split(":")[1])
        )
      );
      finalDates.push(d);
    });
    setAvailableTimings(finalDates);
  };

  useEffect(() => {
    if (selectedServices.length == 0) {
      return navigate("/");
    }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  useEffect(() => {
    getDates();
  }, [selectedDate]);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const selectedStaff = useSelector(selectedStaffSelector);

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
              Select Date with {selectedStaff.title ?? "STAA"}
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
        availableTimings.map((timing) => (
          <DateTile key={Math.random()} timing={timing} />
        ))}
    </div>
  );
}
