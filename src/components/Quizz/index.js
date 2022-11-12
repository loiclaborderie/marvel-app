import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizzMarvel } from "../QuizzMarvel";

class Quizz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizzLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    questionNumber: 0,
    question: null,
    options: [],
  };

  loadQuestions = (level) => {
    const questions = QuizzMarvel[0][level];
    if (questions.length >= this.state.maxQuestions) {
      const safeArray = questions.map(({ answer, ...keepRest }) => keepRest);
      this.setState({
        storedQuestions: safeArray,
      });
    } else {
      console.log("pas assez de questions!!!");
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizzLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question:
          this.state.storedQuestions[this.state.questionNumber].question,
        options: this.state.storedQuestions[this.state.questionNumber].options,
      });
    }
  }

  render() {
    const displayOptions = this.state.options.map((option, i) => {
      return (
        <p key={i} className="answerOptions">
          {option}
        </p>
      );
    });
    const { pseudo } = this.props.userData;
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quizz;
