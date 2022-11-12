import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

function Login() {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email !== "" && password.length > 5) {
      setBtn(true);
    } else if (btn === true) {
      setBtn(false);
    }
  }, [email, password, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = firebase.auth;
    firebase
      .loginUser(auth, email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        navigate("/welcome");
      })
      .catch((error) => {
        setError(error);
        setPassword("");
      });
  };

  const errorMsg =
    error.message === "Firebase: Error (auth/wrong-password)."
      ? "Le mot de passe rentré est incorrect"
      : "Cette adresse email n'existe pas";
  const errorDisplay = error !== "" && <span>{errorMsg}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Connexion</h2>
            {errorDisplay}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  name="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btn ? (
                <button id="btnLogin">Connexion</button>
              ) : (
                <button disabled id="btnLogin">
                  Connexion
                </button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Vous n'avez pas de compte ? Inscrivez-vous
              </Link>
              <br />
              <br />
              <Link className="simpleLink" to="/forgotpassword">
                Vous avez oublié votre mot de passe ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
