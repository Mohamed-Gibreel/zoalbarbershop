import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useDispatch } from "react-redux";
import { setSelectedStaff } from "../../../features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";

export default function StaffCard(props) {
  const {
    staff: { title, description, rating },
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setSelectedStaff(props.staff));
    navigate("/select-date");
  };

  return (
    <div
      className="w-screen cursor-pointer hover:bg-[rgb(242,242,242)] transition ease-in-out duration-300 delay-0"
      onClick={handleClick}
    >
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
  );
}
