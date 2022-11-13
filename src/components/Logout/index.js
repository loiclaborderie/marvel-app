import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import ReactTooltip from "react-tooltip";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (checked) {
      const auth = firebase.auth;
      firebase.signoutUser(auth);
    }
  }, [checked, firebase]);

  return (
    <div className="logoutContainer">
      <label className="switch">
        <div className="imgThatSaysLogout"></div>
        <input
          onChange={() => setChecked(!checked)}
          type="checkbox"
          id="checkedInput"
          name="checkedInput"
          checked={checked}
        />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <ReactTooltip place="left" effect="solid" />
    </div>
  );
};

export default Logout;
