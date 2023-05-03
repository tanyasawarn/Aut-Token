import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/authcontext";

const ProfileForm = () => {

  const history= useNavigate();
    const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCp3CtTZKkTpTX35hg6q4KXdL6fJXTDCgk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace('/');
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
