import React from "react";

const Modal = ({ openModal, children, closeModal }) => {
  return (
    openModal && (
      <div onClick={closeModal} className="modalBackground">
        <div className="modalContainer">{children}</div>
      </div>
    )
  );
};

export default Modal;
