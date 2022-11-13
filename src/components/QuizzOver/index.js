import React, { useEffect, useState } from "react";

const QuizzOver = React.forwardRef(
  (
    {
      levelNames,
      score,
      maxQuestions,
      quizzLevel,
      percent,
      loadLevelQuestions,
    },
    ref
  ) => {
    const [asked, setAsked] = useState([]);

    useEffect(() => {
      setAsked(ref.current);
    }, [ref]);

    const positiveGradeMsg = percent > 80 ? "Excellent" : "Pas mal";
    const negativeGradeMsg =
      percent > 30
        ? "Tu le fais exprès ? Vous avez échoué"
        : "Dommage, vous avez échoué";
    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
      setTimeout(() => {
        loadLevelQuestions(quizzLevel);
      }, 3000);
    }

    const decision =
      score >= averageGrade ? (
        <>
          <div className="stepsBtnContainer">
            {quizzLevel < levelNames.length ? (
              <>
                <p className="successMsg">
                  {positiveGradeMsg}, passez au niveau suivant !
                </p>
                <button
                  onClick={() => loadLevelQuestions(quizzLevel)}
                  className="btnResult success"
                >
                  Niveau Suivant
                </button>
              </>
            ) : (
              <>
                <p className="successMsg">Bravo, vous êtes un expert !</p>
                onClick={() => loadLevelQuestions(0)}
                <button className="btnResult gameOver">Acceuil</button>
              </>
            )}
          </div>
          <div className="percentage">
            <div className="progressPercent">
              Note: {score} / {maxQuestions}
            </div>
            <div className="progressPercentRight">
              <div
                className="progressBarChangeRight"
                style={{
                  background: "green",
                  width: `${percent}%`,
                }}
              ></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="stepsBtnContainer">
            <p className="failureMsg">{negativeGradeMsg}</p>
          </div>

          <div className="percentage">
            <div className="progressPercent">
              Note: {score} / {maxQuestions}
            </div>
            <div className="progressPercentRight">
              <div
                className="progressBarChangeRight"
                style={{
                  background: "red",
                  width: `${percent}%`,
                }}
              ></div>
            </div>
          </div>
        </>
      );
    const data =
      score >= averageGrade ? (
        asked.map((questions) => {
          return (
            <tr key={questions.id}>
              <td>{questions.question}</td>
              <td>{questions.answer}</td>
              <td>
                <button className="btnInfo">Infos</button>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="3">
            <div className="loader"></div>
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              Pas de réponses pour toi, réessaye !
            </p>
          </td>
        </tr>
      );

    return (
      <>
        {decision}

        <hr />
        <p>Les réponses aux questions posées: </p>
        <div className="answerContainer">
          <table className="answers">
            <thead>
              <tr>
                <th>Questions</th>
                <th>Réponses</th>
                <th>Informations</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </>
    );
  }
);

export default React.memo(QuizzOver);
