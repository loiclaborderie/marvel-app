import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from "axios";

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
    const [characterInfo, setCharacterInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const publicKey = "e8263005bf9f1816b49a0651b6611838";
    const hash = "80df54df547b22fc1e70be64a96b029a";

    useEffect(() => {
      setAsked(ref.current);
      if (localStorage.getItem("marvelStorageDate")) {
        const date = localStorage.getItem("marvelStorageDate");
        checkDataAge(date);
      }
    }, [ref]);

    const checkDataAge = (date) => {
      let today = Date.now();
      const timeDifference = today - date;
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      if (daysDifference >= 15) {
        localStorage.clear();
        localStorage.setItem("marvelStorageDate", Date.now());
      }
    };

    const showModal = (id) => {
      setOpenModal(true);

      if (localStorage.getItem(id)) {
        setCharacterInfo(JSON.parse(localStorage.getItem(id)));
        setLoading(false);
        console.log("info trouvée via localStorage");
      } else {
        axios
          .get(
            `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${publicKey}&hash=${hash}`
          )
          .then((response) => {
            setCharacterInfo(response.data);
            console.log("info fetched via axios");
            setLoading(false);

            localStorage.setItem(id, JSON.stringify(response.data));
            if (!localStorage.getItem("marvelStorageDate")) {
              localStorage.setItem("marvelStorageDate", Date.now());
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const closeModal = () => {
      setOpenModal(false);
      setLoading(true);
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

    const firstCapital = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

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

    const resultInModal = !loading ? (
      <>
        <div className="modalHeader">
          <h2> {characterInfo.data.results[0].name} </h2>
        </div>
        <div className="modalBody">
          <div className="comicImage">
            <img
              src={
                characterInfo.data.results[0].thumbnail.path +
                "." +
                characterInfo.data.results[0].thumbnail.extension
              }
              alt={characterInfo.data.results[0].name}
            />
            {characterInfo.attributionText}
          </div>
          <div className="comicDetails">
            <h3>Description</h3>
            {characterInfo.data.results[0].description ? (
              <p>{characterInfo.data.results[0].description}</p>
            ) : (
              <p>Description indisponible</p>
            )}
            <h3>Plus d'informations</h3>
            {characterInfo.data.results[0].urls &&
              characterInfo.data.results[0].urls.map((url, index) => {
                return (
                  <a
                    className=""
                    key={index}
                    href={url.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {firstCapital(url.type)}
                  </a>
                );
              })}
          </div>
        </div>
        <div className="modalFooter">
          <button onClick={closeModal} className="modalBtn">
            Fermer
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="modalHeader">
          <h2> Réponse de Marvel... </h2>
        </div>
        <div className="modalBody">
          <Loader />
        </div>
        <div className="modalFooter">
          <button onClick={closeModal} className="modalBtn">
            Fermer
          </button>
        </div>
      </>
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
        <Modal openModal={openModal}>{resultInModal}</Modal>
      </>
    );
  }
);

export default React.memo(QuizzOver);
