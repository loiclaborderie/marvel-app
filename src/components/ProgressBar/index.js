import React from "react";

const ProgressBar = ({ percentage }) => {
  const actualPercentage = (percentage + 1) * 10;
  return (
    <>
      {/* <div className="percentage">
        <div className="progressPercent">Question 1/10</div>
        <div className="progressPercent">Progression : 10%</div>
      </div> */}
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
