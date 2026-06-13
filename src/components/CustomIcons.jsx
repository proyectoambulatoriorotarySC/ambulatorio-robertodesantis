import React from "react";

export const Tooth = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Z" />
    <path d="M18.8 6.5C18.3 4.2 16.5 2 13 2H11C7.5 2 5.7 4.2 5.2 6.5 4.5 9.7 5.5 13 7 15l1.5 6h7l1.5-6c1.5-2 2.5-5.3 1.8-8.5Z" />
  </svg>
);
