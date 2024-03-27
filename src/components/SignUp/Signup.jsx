import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase";
import { useReducer } from "react";
const SignUp = () => {
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

  const auth = getAuth(app);

  const signup = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(() => alert("Successfully user created"))
      .catch((e) => alert(e, "Something Went Wrong"));
  };
  return (
    <div className="signin">
      <h1>SignUp Page</h1>
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
          <button className="sign" onClick={signup}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
