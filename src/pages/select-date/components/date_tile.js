import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedServices as selectedServicesSelector,
  setSelectedEndDate,
  setSelectedStartDate,
} from "../../../features/booking/bookingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DateTile(props) {
  const { timing } = props;
  const selectedServices = useSelector(selectedServicesSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectDate = (startDate) => {
    const totalTimeNeeded = selectedServices.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.duration;
      },
      0
    );
    var endDate = moment(startDate).add(totalTimeNeeded, "m").toDate();
    dispatch(setSelectedStartDate(startDate.toString()));
    dispatch(setSelectedEndDate(endDate.toString()));
    navigate("/confirm-number");
  };

  return (
    <button onClick={() => handleSelectDate(timing)}>
      <div className="w-screen cursor-pointer hover:bg-[rgb(242,242,242)] transition ease-in-out duration-300 delay-0">
        <div className="w-[90%] h-24 mx-auto flex items-center justify-between gap-x-6 border-b">
          <div className="font-bold">{moment(timing).format("h:mm A")}</div>
          <FontAwesomeIcon icon={solid("chevron-right")} color={"black"} />
        </div>
      </div>
    </button>
    // </Link>
  );
}
