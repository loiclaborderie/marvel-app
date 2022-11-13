import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";

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
    const [openModal, setOpenModal] = useState(false);

    const publicKey = "e8263005bf9f1816b49a0651b6611838";
    const hash = "24e27ded85860907bcc934f8d7846d12";

    useEffect(() => {
      setAsked(ref.current);
    }, [ref]);

    const showModal = (id) => {
      setOpenModal(true);
    };

    const closeModal = () => {
      setOpenModal(false);
    };

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
                <p className="successMsg">
                  <GiTrophyCup size={"3em"} color={"gold"} />
                  Bravo, vous êtes un expert !
                </p>

                <button
                  onClick={() => loadLevelQuestions(0)}
                  className="btnResult gameOver"
                >
                  Acceuil
                </button>
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
                <button
                  onClick={() => showModal(questions.heroId)}
                  className="btnInfo"
                >
                  Infos
                </button>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="3">
            <Loader
              message={"Pas de réponses pour toi, réessaye !"}
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 24,
                fontWeight: 900,
              }}
            />
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
        <Modal closeModal={closeModal} openModal={openModal}>
          <div className="modalHeader">
            <h2>Titre</h2>
          </div>
          <div className="modalBody">
            <h3>Titre 2</h3>
          </div>
          <div className="modalFooter">
            <button className="modalBtn">Fermer</button>
          </div>
        </Modal>
      </>
    );
  }
);

export default React.memo(QuizzOver);
