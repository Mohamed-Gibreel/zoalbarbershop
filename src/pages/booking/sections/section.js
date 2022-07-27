import React from "react";
import "../booking.css";
import ServiceCard from "../service_card";

export default function ServiceSection(props) {
  const {
    section: { title, services },
    onSelected,
  } = props;

  const handleChange = (value, service) => {
    if (onSelected) {
      onSelected(value, service);
    }
  };
  return (
    <>
      <div className="text-2xl font-300 mb-5 mt-16 font-bold">
        {title ?? "Title"}
      </div>
      {services.length > 0 &&
        services.map((service) => (
          <ServiceCard
            onChanged={(value, service) => handleChange(value, service)}
            service={service}
          />
        ))}
    </>
  );
}
