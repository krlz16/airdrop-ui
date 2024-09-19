"use client";

import * as React from "react";
import { useState } from "react";

type Props = {
  text: string
  children: any
}

const Tooltip = ({ text, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-4 text-white text-sm rounded shadow-lg z-10">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip