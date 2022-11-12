import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Landing() {
  const [btn, setBtn] = useState(false);
  const refWolverine = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      refWolverine.current.classList.add("startingImg");
    }, 500);
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []);

  const setleftImg = () => {
    refWolverine.current.classList.add("leftImg");
  };
  const removeLeftImg = () => {
    refWolverine.current.classList.remove("leftImg");
  };
  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  };
  const removeRightImg = () => {
    refWolverine.current.classList.remove("rightImg");
  };

  const btnShow = btn && (
    <>
      <div
        onMouseLeave={removeLeftImg}
        onMouseOver={setleftImg}
        className="leftBox"
      >
        <Link className="btn-welcome" to="/signup">
          Inscription
        </Link>
      </div>
      <div
        onMouseLeave={removeRightImg}
        onMouseOver={setRightImg}
        className="rightBox"
      >
        <Link className="btn-welcome" to="/login">
          Connexion
        </Link>
      </div>
    </>
  );

  return (
    <main ref={refWolverine} className="welcomePage">
      {btnShow}
    </main>
  );
}

export default Landing;
