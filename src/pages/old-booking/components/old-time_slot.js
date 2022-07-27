import React from "react";

export default function TimeSlot(props) {
  const { time } = props;
  return (
    <div className="border-black border px-1 py-1 text-center">
      {time ?? "10:30 AM"}
    </div>
  );
}
