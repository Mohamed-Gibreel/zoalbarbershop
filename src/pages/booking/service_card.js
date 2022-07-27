import "./custom_checkbox.css";
import { useEffect, useState } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain,
} from "react-spring";

import React from "react";

export default function ServiceCard(props) {
  const { isSelected, onChanged, service } = props;
  const [isChecked, setIsChecked] = useState(isSelected ?? false);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "rgb(3, 122, 255)" : "#fff",
    borderColor: isChecked ? "rgb(3, 122, 255)" : "rgb(183, 186, 190)",
    config: config.gentle,
    padding: "4px",
    ref: checkboxAnimationRef,
  });

  useEffect(() => {
    if (onChanged) {
      onChanged(isChecked, service);
    }
  }, [isChecked]);

  const CustomCheckBox = () => {
    return (
      <label>
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <animated.svg
          style={checkboxAnimationStyle}
          className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M1 4.5L5 9L14 1"
            strokeWidth="1"
            stroke="#fff"
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </animated.svg>
      </label>
    );
  };

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef,
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  return (
    <>
      <div className="flex items-center justify-between gap-x-2 mb-4 mt-4">
        <CustomCheckBox />
        <div
          className="flex flex-row grow items-center justify-between cursor-pointer"
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        >
          <div>
            <div className="text-xl font-medium">
              {service.name ?? "Service Title"}
            </div>
            <div className="text-secondary-grey flex items-center gap-x-1">
              <span>{service.duration ?? 40} Minutes</span>
              <span className="dot bg-secondary-grey"></span>
              <span>Male Only</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-lg">AED {service.price ?? 80}</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
