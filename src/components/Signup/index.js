import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const firebase = useContext(FirebaseContext);
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(data);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };
  const { pseudo, email, password, confirmPassword } = loginData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = firebase.auth;
    firebase
      .signupUser(auth, email, password)
      .then((authUser) => {
        const db = firebase.db;
        const path = firebase.user(db, authUser.user.uid);
        const obj = {
          pseudo: pseudo,
          email: email,
        };
        firebase.addData(path, obj);
      })
      .then(() => {
        setLoginData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error);
        setLoginData({ ...data });
      });
  };

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button id="btnLogin">Inscription</button>
    );

  let errorMsg;
  if (
    error.message ===
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    errorMsg = "Votre mot de passe doit faire au minimum caractères.";
  } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
    errorMsg = "Cette adresse email est déjà associée à un compte existant";
  } else if (error.message === "Firebase: Error (auth/invalid-email).") {
    errorMsg = "Veuillez saisir une adresse email valide.";
  } else {
    errorMsg = error.message;
  }
  const errorDisplay = error !== "" && <span>{errorMsg}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Inscription</h2>
            {errorDisplay}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  name="pseudo"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="mail"
                  placeholder=""
                  id="email"
                  name="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer votre mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déja inscrit ? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
