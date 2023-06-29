import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 0C21.732 0 28 6.268 28 14C28 21.732 21.732 28 14 28C6.268 28 0 21.732 0 14C0 6.268 6.268 0 14 0ZM18.3471 7.269L20.9389 9.993L16.7275 13.9999L20.9389 18.0067L18.3471 20.7307L14 16.5949L9.65295 20.7307L7.06115 18.0067L11.2725 13.9999L7.06115 9.993L9.65295 7.269L14 11.405L18.3471 7.269Z"
      fill="#FF5E5E"
    />
  </svg>
);
export default SVGComponent;
