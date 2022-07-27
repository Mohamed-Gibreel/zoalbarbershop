import React, { useEffect, useState } from "react";
import ScrollSpyTabs from "./ScrollSpyTabs";
import ServiceSection from "./sections/section";
import services from "../../sample-data/services.json";

export default function Booking() {
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    console.log(selectedServices);
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  }, [selectedServices]);

  const handleChange = (value, service) => {
    if (value) {
      handleAddService(service);
    } else {
      handleRemoveService(service);
    }
  };

  const handleAddService = (service) => {
    //TODO: Handle add servce logic here.
    setSelectedServices([...selectedServices, service]);
  };

  const handleRemoveService = (service) => {
    //TODO: Handle remove servce logic here.
    var filteredServices = [...selectedServices].filter(
      (s) => s.id != service.id
    );
    setSelectedServices([...filteredServices]);
  };

  return (
    <div
      style={{
        fontFamily: "roboto, sans-serif",
        fontSize: 15,
        backgroundColor: "#fff",
      }}
    >
      <ScrollSpyTabs
        tabsInScroll={[
          {
            text: "Featured",
            component: (
              <ServiceSection
                section={{ title: "Featured", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Hair",
            component: (
              <ServiceSection
                section={{ title: "Hair", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Beard",
            component: (
              <ServiceSection
                section={{ title: "Beard", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Beard-2",
            component: (
              <ServiceSection
                section={{ title: "Beard 2", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Blow Dry",
            component: (
              <ServiceSection
                section={{ title: "Blow Dry", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Hair Color",
            component: (
              <ServiceSection
                section={{ title: "Hair Color", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Facial Treatment",
            component: (
              <ServiceSection
                section={{
                  title: "Facial Treatment",
                  services: services.services,
                }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Treatments",
            component: (
              <ServiceSection
                section={{ title: "Treatments", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Eyebrows",
            component: (
              <ServiceSection
                section={{ title: "Eye Brows", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Wax",
            component: (
              <ServiceSection
                section={{ title: "Wax", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Nails",
            component: (
              <ServiceSection
                section={{ title: "Nail", services: services.services }}
                onSelected={handleChange}
              />
            ),
          },
          {
            text: "Massage",
            component: (
              <div className="mb-20">
                <ServiceSection
                  section={{ title: "Massage", services: services.services }}
                  onSelected={handleChange}
                />
              </div>
            ),
          },
        ]}
        selectedServices={selectedServices}
      />
    </div>
  );
}
