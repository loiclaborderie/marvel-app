import React from "react";

const Loader = ({ message, style }) => {
  return (
    <>
      <div className="loader"></div>
      <p style={style}>{message}</p>
    </>
  );
};

export default Loader;
