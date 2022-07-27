import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab } from "@mui/material";
import React, { useEffect } from "react";
import BGImage from "../../assets/images/zoal-corner.jpeg";
import Navbar from "./components/nav_bar";
import ServiceCard from "./components/service_card";
import ServiceTab from "./components/service_tab";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

//Fake Data
import fakeServices from "../../sample-data/services.json";

export default function Homepage() {
  return (
    <>
      <Fab
        color="white"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "2%",
          right: "5%",
        }}
      >
        <FontAwesomeIcon icon={solid("cart-shopping")} size="1x" />
        <div
          style={{
            position: "absolute",
            top: -5,
            right: 0,
          }}
        >
          <div
            style={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="bg-primary-orange text-white"
          >
            <span
              style={{
                fontSize: "10px",
              }}
            >
              5
            </span>
          </div>
        </div>
      </Fab>
      <div className="relative">
        <Navbar />
        <div
          className="h-80v bg-fixed"
          style={{
            backgroundImage: `url(${BGImage})`,
            position: "relative",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="bg-primary-grey pt-16 pb-16 flex flex-col items-center">
          <span className="text-white text-5xl mb-10">Our Services</span>
          <div className="flex flex-row w-[70%] flex-wrap gap-x-2 gap-y-2 justify-center mb-10">
            <ServiceTab title="Hair" />
            <ServiceTab title="Beard" />
            <ServiceTab title="Blow Dry" />
            <ServiceTab title="Hair Color" />
            <ServiceTab title="Treatments" />
            <ServiceTab title="Eye Brows" />
            <ServiceTab title="Wax" />
            <ServiceTab title="Nails" />
            <ServiceTab title="Massage" />
          </div>
          {fakeServices.services.length > 0 &&
            fakeServices.services.map((service) => {
              return <ServiceCard key={service.id} service={service} />;
            })}
        </div>
      </div>
    </>
  );
}
