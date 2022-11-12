import React, { Component, createRef } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizzMarvel } from "../QuizzMarvel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizzOver from "../QuizzOver";

class Quizz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizzLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    questionNumber: 0,
    question: null,
    options: [],
    btnDisabled: true,
    selectedAnswer: null,
    score: 0,
    shownWelcomeMsg: false,
    quizzEnd: false,
  };

  storedDataRef = React.createRef();

  loadQuestions = (level) => {
    const questions = QuizzMarvel[0][level];
    if (questions.length >= this.state.maxQuestions) {
      this.storedDataRef.current = questions;
      const safeArray = questions.map(({ answer, ...keepRest }) => keepRest);
      this.setState({
        storedQuestions: safeArray,
      });
    } else {
      console.log("pas assez de questions!!!");
    }
  };

  welcomeMsg = (pseudo) => {
    if (!this.state.shownWelcomeMsg) {
      this.setState({
        shownWelcomeMsg: true,
      });

      toast(`Content de te voir,  ${pseudo}  🙋‍♂️`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  gameOver() {
    this.setState({
      quizzEnd: true,
    });
  }

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

    if (this.state.questionNumber !== prevState.questionNumber) {
      this.setState({
        question:
          this.state.storedQuestions[this.state.questionNumber].question,
        options: this.state.storedQuestions[this.state.questionNumber].options,
        selectedAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.props.userData.pseudo) {
      this.welcomeMsg(this.props.userData.pseudo);
    }
  }

  pickAnswer = (selected) => {
    this.setState({
      selectedAnswer: selected,
      btnDisabled: false,
    });
  };

  handleSubmit = () => {
    if (this.state.questionNumber === this.state.maxQuestions - 1) {
      console.log("game finished");
      this.gameOver();
    } else {
      this.setState((prev) => ({
        questionNumber: prev.questionNumber + 1,
      }));
    }
    const goodAnswer =
      this.storedDataRef.current[this.state.questionNumber].answer;
    if (this.state.selectedAnswer === goodAnswer) {
      this.setState((prev) => ({
        score: prev.score + 1,
      }));
      const congrats = [
        "Congratulations !",
        "Congratulations !",
        "Bravo !",
        "Congratulations !",
        "Congratulations !",
        "Bravo !",
        "Bravo !",
        "Bravo !",
        "Herzlichen Glückwunsch!",
        "Felisitasyon!",
        "Gratulálunk!",
        "Selamat!",
        "Congratulazioni!",
        "Felicitări!",
        "mabrouk!",
        "felicidades!",
        "felicidades!",
      ];
      toast.success(this.pickRandom(congrats), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const fail = [
        "Dommage, essaye encore...",
        "Too bad, try again...",
        "Encore raté !",
        "Réfléchis mieux la prochaine fois",
        "Allez, on se ressaisit!",
        "Je commence à avoir pitié de toi...",
        "Mauvaise réponse!",
        "NOOOOOPE",
      ];
      toast.error(this.pickRandom(fail), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  render() {
    const displayOptions = this.state.options.map((option, i) => {
      return (
        <p
          key={i}
          onClick={() => this.pickAnswer(option)}
          className={`answerOptions ${
            this.state.selectedAnswer === option ? "selected" : null
          }`}
        >
          {option}
        </p>
      );
    });
    const { pseudo } = this.props.userData;

    return this.state.quizzEnd ? (
      <QuizzOver />
    ) : (
      <>
        <Levels />
        <ProgressBar percentage={this.state.questionNumber} />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          onClick={this.handleSubmit}
          className="btnSubmit"
        >
          {this.state.questionNumber < this.state.maxQuestions - 1
            ? "Suivant"
            : "Terminer"}
        </button>
        <ToastContainer />
      </>
    );
  }
}

export default Quizz;
