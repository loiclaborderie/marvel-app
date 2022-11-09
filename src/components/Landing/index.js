import React, { useRef, useEffect, useState } from "react";

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
        <button className="btn-welcome">Inscription</button>
      </div>
      <div
        onMouseLeave={removeRightImg}
        onMouseOver={setRightImg}
        className="rightBox"
      >
        <button className="btn-welcome">Connexion</button>
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
