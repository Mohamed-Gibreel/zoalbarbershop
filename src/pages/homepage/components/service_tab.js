import React from "react";

export default function ServiceTab(props) {
  const { title } = props;
  return (
    <div className="h-10 bg-primary-orange text-white flex justify-center items-center rounded text-sm pl-6 pr-6">
      {title ?? "Beard"}
    </div>
  );
}
