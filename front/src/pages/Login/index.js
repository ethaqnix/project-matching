import React, { useState } from "react";
import { useHistory } from "react-router";

import { loginUser, useAuth } from "../../contexts/authContext";
import styles from "./login.module.css";

function Login(props) {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const history = useHistory();
  const [{ loading, connected, errorMessage }, setAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (
        await loginUser(setAuth, {
          firstName,
          lastName,
          password,
        })
      ) {
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={{ width: 200 }}>
        <h1>Login Page</h1>
        {errorMessage ? (
          <p className={styles.error}>{`${errorMessage}`}</p>
        ) : null}
        <form>
          <div className={styles.loginForm}>
            <div className={styles.loginFormItem}>
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.loginFormItem}>
              <label htmlFor="lastname">Lase name</label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className={styles.loginFormItem}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <button onClick={handleLogin} disabled={loading}>
            login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
