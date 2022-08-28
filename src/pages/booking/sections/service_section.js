import React, { useEffect } from "react";
import "../style/booking.css";
import ServiceCard from "../components/service_card";

export default function ServiceSection(props) {
  const {
    section: { title, services },
  } = props;

  return (
    <>
      <div className="text-2xl font-300 mb-5 mt-16 font-bold">
        {title ?? "Title"}
      </div>
      {services.length > 0 &&
        services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
    </>
  );
}
