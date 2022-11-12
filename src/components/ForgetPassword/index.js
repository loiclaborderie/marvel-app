import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const ForgetPassword = () => {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = firebase.auth;
    firebase
      .passwordReset(auth, email)
      .then(() => {
        setError("");
        setSuccess(`Consultez ${email} pour réinitialiser votre mot de passe`);
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  let errorMsg;
  if (error.message === "Firebase: Error (auth/invalid-email).") {
    errorMsg = "L'adresse email saise est incorrecte";
  } else if (error.message === "Firebase: Error (auth/user-not-found).") {
    errorMsg = "Cette adresse email n'est associée à aucun compte";
  } else {
    errorMsg = error.message;
  }

  const isDisabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Mot de passe oublié ?</h2>
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "white",
                }}
              >
                {success}
              </span>
            )}
            {error && <span>{errorMsg}</span>}

            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button id="btnLogin" disabled={isDisabled}>
                Récupérer
              </button>
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

export default ForgetPassword;
