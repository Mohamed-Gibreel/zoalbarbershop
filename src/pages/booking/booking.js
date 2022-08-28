import React, { useEffect, useState } from "react";
import ScrollSpyTabs from "./ScrollSpyTabs";
import ServiceSection from "./sections/service_section";
import { getServies } from "../../config/axios/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  allServices as allServicesSelector,
  setAllServices,
} from "../../features/booking/bookingSlice";

export default function Booking() {
  const allServices = useSelector(allServicesSelector);
  const [services, setServices] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (allServices.length == 0) {
      fetchServices();
    }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    let formattedServices = [];
    Object.entries(allServices).forEach(([key, value]) => {
      formattedServices.push({
        text: value[0].category.name,
        component: (
          <ServiceSection
            key={key}
            section={{
              title: value[0].category.name,
              services: value,
            }}
          />
        ),
      });
    });
    setServices(formattedServices);
  }, [allServices]);

  const fetchServices = async () => {
    var res = await (await getServies()).data.results;
    var fetchedServices = res.reduce(function (results, service) {
      (results[service.category.id] = results[service.category.id] || []).push(
        service
      );
      return results;
    }, {});
    dispatch(setAllServices(fetchedServices));
  };

  return (
    <div
      style={{
        fontFamily: "roboto, sans-serif",
        fontSize: 15,
        backgroundColor: "#fff",
      }}
    >
      {services.length > 0 && <ScrollSpyTabs tabsInScroll={services} />}
    </div>
  );
}
