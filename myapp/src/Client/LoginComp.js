import { React, useEffect, useState } from "react";
import axios from "axios";
import { Route, useHistory, Link } from "react-router-dom";
import HomePage from "./HomePage";
import styles from "./LoginComp.module.css";

const LoginComp = () => {
  const history = useHistory();
  const [userName, setName] = useState("");
  const [pass, setPass] = useState("");
  const [userData, setData] = useState([]);
  const [err, setError] = useState({ name: "" });

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await axios("http://localhost:8000/users");
      setData(usersData.data)
    };
    fetchData();
  }, []);

  let validate = () => {
    let valid = 0;
    const found = userData.findIndex((user) => user.username == userName);
    if (found > -1) {
      if (userData[found].password == pass) {
        valid = 1;
        console.log(valid);
        localStorage.setItem("userName", userData[found].username);
        localStorage.setItem("userId", userData[found]._id);
      } else {
        alert("password is incorrect");
      }
    } else {
      alert("user not found");
    }
    return valid;
  };

  let handleNameChanged = (e) => {
    if (e.target.value) {
      setName(e.target.value);
      setError((err) => ({ ["name"]: "" }));
    } else {
      setError((err) => ({ ["name"]: "required" }));
      console.log(err);
    }
  };
  return (
    <div className={styles.loginSection}>
      <div className={styles.LoginComp2}>
        <h3>Movies Web Service</h3>
        <form name="loginForm">
          <div>
            <div className={styles.gridcontainer}>
              <div>
                <input 
                  name="userName"
                  refs="name"
                  placeholder="User name..."
                  className={(err.name=="" ? styles.loginInput : styles.errBorder)}
                  onChange={handleNameChanged}
                />
                {/* <div className={styles.error}>{err.name}</div> */}
              </div>
            </div>
            <div></div>
            <div className={styles.gridcontainer}>
              <div>
                <input
                  type="password"
                  refs="password"
                  placeholder="Password..."
                  className={styles.loginInput}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                className={styles.loginBtn}
                onClick={() => (validate() ? history.push("/home") : "")}
              >
                Login
              </button>
            </div>
            <div>
              New user? <Link to="CreateAccount">Create Account</Link>
            </div>
          </div>
          <div>
            <Route path="/home" component={HomePage} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginComp;
