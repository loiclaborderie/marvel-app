import React, { Component } from "react";
import Levels from "../Levels";

class Quizz extends Component {
  render() {
    const { pseudo } = this.props.userData;
    return (
      <div>
        <Levels />
      </div>
    );
  }
}

export default Quizz;
