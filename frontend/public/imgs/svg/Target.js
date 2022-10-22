import * as React from "react";

const SvgTarget = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330"
    style={{
      enableBackground: "new 0 0 330 330",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path d="M165 0C74.019 0 0 74.019 0 165s74.019 165 165 165 165-74.019 165-165S255.981 0 165 0zm0 300c-74.44 0-135-60.561-135-135S90.56 30 165 30s135 60.561 135 135-60.561 135-135 135z" />
    <path d="M165 75c-49.626 0-90 40.374-90 90s40.374 90 90 90 90-40.374 90-90-40.374-90-90-90zm0 150c-33.084 0-60-26.916-60-60s26.916-60 60-60 60 26.916 60 60-26.916 60-60 60z" />
    <circle cx={165} cy={165} r={25} />
  </svg>
);

export default SvgTarget;
