import "./Login.css";
import { useReducer } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";
const Login = () => {
  let reducer = (state, action) => {
    if (action.type == "email") {
      return { ...state, email: action.payload };
    }
    if (action.type == "password") {
      return { ...state, password: action.payload };
    }
  };
  let initialState = {
    email: "",
    password: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  let auth = getAuth(app);

  let login = () => {
    signInWithEmailAndPassword(auth , state.email , state.password)
    .then(() => alert("Successfully Loged In"))
    .catch((error) => alert(error))
  }
  return (
    <div className="login">
      <h1>Login Page</h1>
      <div className="inputs">
        <div className="email">
          <input
            type="email"
            placeholder="Enter your Email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Enter your Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
          />
        </div>
        <div className="button">
          <button className="log" onClick={login}>Login In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
