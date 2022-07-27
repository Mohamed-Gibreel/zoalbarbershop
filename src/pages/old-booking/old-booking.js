import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Select from "react-select";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import TimeSlot from "./components/old-time_slot";
import moment from "moment";
import "./booking.css";
import { Link } from "react-router-dom";
import { components } from "react-select";

export default function BookingPage() {
  const options = [
    { value: "kamal", label: "Kamal Lisam" },
    { value: "mohamed", label: "Mohamed Malkawi" },
    { value: "nour", label: "Nour" },
    { value: "oussama", label: "Oussama Achour" },
    { value: "zool", label: "Zool" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: "#1e2022",
      backgroundColor: state.isSelected ? "rgba(189,197,209,.3)" : "white",
      padding: ".5rem 3rem .5rem .5rem",
      cursor: "pointer",
    }),
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <label class="container">
            {props.label}
            <input
              type="checkbox"
              checked={props.isSelected}
              onChange={() => null}
            />
            <span class="checkmark"></span>
          </label>
        </components.Option>
      </div>
    );
  };

  return (
    <div className="bg-white h-screen margin my-0 mx-auto px-10 pt-10 flex flex-col md:flex-row md:gap-x-16">
      <div className="flex-1">
        <div className="text-xs">
          <FontAwesomeIcon icon={solid("angle-left")} className="mr-2" />
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
        <div className="mt-6">
          <div className="text-lg mb-2">Preferred barber(s):</div>
          <hr />
          <div className="flex flex-col gap-x-2 mt-2 ">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              isMulti
              options={options}
              components={{
                Option,
                // ValueContainer,
              }}
              placeholder="Choose a barber"
              styles={customStyles}
              allowSelectAll={true}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isSearchable={false}
              className="flex-[1]"
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex flex-row justify-between items-center">
            <span className="text-lg ">Select a date and time</span>
            <span className="text-xs">Gulf Standard Time (GST)</span>
          </div>
          <hr />
          <div className="flex items-center gap-x-2 mt-2 justify-center">
            <Calendar
              date={selectedDate}
              onChange={setSelectedDate}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
            />
          </div>
          <div>
            <div className="mb-6">
              {moment(selectedDate).format("dddd, Do MMMM")}
              <hr />
            </div>
            <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              <TimeSlot time="10:00 AM" />
              <TimeSlot time="12:00 PM" />
              <TimeSlot time="2:00 PM" />
              <TimeSlot time="4:00 PM" />
              <TimeSlot time="6:00 PM" />
              <TimeSlot time="8:00 PM" />
              <TimeSlot time="10:00 PM" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 md:flex md:flex-col md:justify-between">
        <div className="mt-6">
          <div>
            <div className="text-lg mb-2">Booking Summary</div>
            <hr />
            <div className="mt-2">
              <div className="flex flex-row justify-between items-center mb-2">
                <div className="flex flex-row items-center gap-x-2">
                  <span className="dot"></span> Style Cut
                  <span className="text-slate-400">(30 minutes)</span>
                </div>
                <div>60 AED</div>
              </div>
              <div className="flex flex-row justify-between items-between">
                <div className="flex flex-row items-center gap-x-2">
                  <span className="dot"></span> Beard Waash{" "}
                  <span className="text-slate-400">(60 minutes)</span>
                </div>
                <div>60 AED</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-6 w-full bg-black text-white h-12 flex items-center justify-center">
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
