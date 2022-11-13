import React, { Component, createRef } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizzMarvel } from "../QuizzMarvel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizzOver from "../QuizzOver";
import { FaChevronCircleRight } from "react-icons/fa";

const initialState = {
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
  percent: null,
};

const levelNames = ["debutant", "confirme", "expert"];

class Quizz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (level) => {
    const questions = QuizzMarvel[0][level];
    if (questions.length >= this.state.maxQuestions) {
      this.storedDataRef.current = questions;
      const safeArray = questions.map(({ answer, ...keepRest }) => keepRest);
      this.setState({
        storedQuestions: safeArray,
      });
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

  getPercent(maxQuestions, score) {
    return (score / maxQuestions) * 100;
  }

  gameOver(percent) {
    if (percent >= 50) {
      this.setState({
        quizzLevel: this.state.quizzLevel + 1,
        percent: percent,
      });
    } else {
      this.setState({
        percent: percent,
      });
    }
  }

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizzLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    const { maxQuestions, storedQuestions, questionNumber, score, quizzEnd } =
      this.state;

    if (
      storedQuestions !== prevState.storedQuestions &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[questionNumber].question,
        options: storedQuestions[questionNumber].options,
      });
    }

    if (quizzEnd !== prevState.quizzEnd) {
      const grade = this.getPercent(maxQuestions, score);
      this.gameOver(grade);
    }

    if (questionNumber !== prevState.questionNumber && storedQuestions.length) {
      this.setState({
        question: storedQuestions[questionNumber].question,
        options: storedQuestions[questionNumber].options,
        selectedAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
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
      this.setState({
        quizzEnd: true,
      });
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

  loadLevelQuestions = (param) => {
    this.setState({
      ...initialState,
      quizzLevel: param,
    });
    this.loadQuestions(levelNames[param]);
  };

  render() {
    const {
      quizzLevel,
      maxQuestions,
      questionNumber,
      question,
      options,
      btnDisabled,
      selectedAnswer,
      score,
      quizzEnd,
      percent,
    } = this.state;

    const displayOptions = options.map((option, i) => {
      return (
        <p
          key={i}
          onClick={() => this.pickAnswer(option)}
          className={`answerOptions ${
            selectedAnswer === option ? "selected" : null
          }`}
        >
          <FaChevronCircleRight size={"1.2em"} /> {option}
        </p>
      );
    });

    return quizzEnd ? (
      <QuizzOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizzLevel={quizzLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <Levels quizzLevel={quizzLevel} levelNames={levelNames} />
        <ProgressBar percentage={questionNumber} />
        <h2>{question}</h2>
        {displayOptions}
        <button
          disabled={btnDisabled}
          onClick={this.handleSubmit}
          className="btnSubmit"
        >
          {questionNumber < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
        <ToastContainer />
      </>
    );
  }
}

export default Quizz;
