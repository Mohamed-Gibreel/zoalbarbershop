import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

export default function ServiceCard(props) {
  const {
    service: { id, category, name, duration, price },
  } = props;
  let [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    let randomNumber = getRandomNumber();
    setImageUrl(`https://source.unsplash.com/random?sig=${randomNumber}`);
  }, []);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };
  return (
    <div className="w-[70%] bg-white mb-10 h-96 border-primary-orange border rounded overflow-hidden flex flex-col md:flex-row">
      <div
        className="md:h-full h-3/5 w-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      {/* <div className="h-2/6 w-full bg-primary-grey flex flex-row items-center justify-between pl-4 pr-4"> */}
      <div className="md:h-full h-2/5 w-full bg-primary-grey flex flex-col justify-around md:justify-center pl-4 pr-4 pb-4">
        <div className="flex flex-col gap-y-1 md:mb-10">
          <div className="text-xl text-gray-100">{name ?? "Style Cut"}</div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={solid("clock")}
              className="mr-1 w-[12px] text-gray-400"
            />
            <span className="text-xs font-light text-gray-500">
              {duration ?? "30"} minutes
            </span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={solid("dollar-sign")}
              className="mr-1 w-[12px] text-gray-400"
            />
            <span className="text-xs font-light text-gray-500">
              {price ?? "60"} AED
            </span>
          </div>
        </div>
        <Link to="/booking">
          <button className="md:w-[40%] w-full h-10 bg-primary-orange text-white flex justify-center items-center rounded text-sm">
            Book
          </button>
        </Link>
      </div>
    </div>
  );
}
