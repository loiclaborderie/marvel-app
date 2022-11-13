import React from "react";

const ProgressBar = ({ percentage }) => {
  const actualPercentage = (percentage + 1) * 10;
  return (
    <>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${actualPercentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
