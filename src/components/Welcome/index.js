import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import Loader from "../Loader";
import Logout from "../Logout";
import Quizz from "../Quizz";

function Welcome() {
  const [userSession, setuserSession] = useState(null);
  const [userData, setuserData] = useState({});
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user
        ? setuserSession(user)
        : setTimeout(() => {
            navigate("/");
          }, 1000);
    }, []);

    if (userSession !== null) {
      const db = firebase.db;
      const test2 = firebase.user(db, userSession.uid);
      firebase
        .getData(test2)
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setuserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [userSession]);

  return userSession === null ? (
    <>
      <Loader
        message={"Authentification..."}
        style={{ color: "#ffffff", textAlign: "center" }}
      />
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quizz userData={userData} />
      </div>
    </div>
  );
}

export default Welcome;
