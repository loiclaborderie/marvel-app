import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ quizzLevel, levelNames }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizzSteps = levelNames.map((level) => ({
      title: level.toUpperCase(),
    }));
    setLevels(quizzSteps);
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={levels}
        activeStep={quizzLevel}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"#E0E0E0"}
        completeColor={"#E0E0E0"}
        barStyle={"dashed"}
        size={40}
      />
    </div>
  );
};

export default React.memo(Levels);
