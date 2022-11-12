import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const Logout = () => {
  const [checked, setChecked] = useState(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (checked) {
      console.log("déconnexion...");
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
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
