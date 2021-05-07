import React, { useState, FunctionComponent } from "react";
import { useHistory } from "react-router";

import { useAuth } from "../../contexts/authContext";
import { loginUser, signupUser } from "../../contexts/authContext/actions";
import styles from "./login.module.css";

type OwnProps = {};

const Signin: FunctionComponent<OwnProps> = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const history = useHistory();
  const [{ loading, errorMessage }, setAuth] = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    console.log("handleLogin");

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

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    try {
      if (
        await signupUser(setAuth, {
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

  const form: {
    [key: string]: {
      name: string;
      value: string;
      valid: ((value: string) => boolean)[];
      onChange(e: string): void;
    };
  } = {
    firstName: {
      name: "First name",
      value: firstName,
      onChange: (value) => setFirstName(value),
      valid: [],
    },
    lastName: {
      name: "Last name",
      value: lastName,
      onChange: (value) => setLastName(value),
      valid: [],
    },
    password: {
      name: "Password",
      value: password,
      onChange: (value) => setPassword(value),
      valid: [],
    },
  };

  const handleValueChange = (formItem: any) => (e: any) => {
    const value = e.target.value;
    if (
      formItem.valid.reduce(
        (isValid: boolean, f: (e: string) => boolean) => isValid && f(value),
        true
      )
    ) {
      formItem.onChange(value);
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ width: 200 }}>
        <h1>Create an account</h1>
        {errorMessage ? (
          <p className={styles.error}>{`${errorMessage}`}</p>
        ) : null}
        <form>
          <div className={styles.loginForm}>
            {Object.entries(form).map(
              ([key, { onChange, value, valid, name }]) => (
                <div key={name} className={styles.loginFormItem}>
                  <label>{name}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={handleValueChange({
                      onChange,
                      value,
                      valid,
                      name,
                    })}
                    disabled={loading}
                  />
                </div>
              )
            )}
          </div>
          <button onClick={handleLogin} disabled={loading}>
            login
          </button>
          <button onClick={handleSignUp} disabled={loading}>
            create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
