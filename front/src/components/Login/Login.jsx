/* IMPORTS */
// Config
import React from "react";
// Components
import style from "./LoginStyle.css";

export default ({
  handleChange,
  handleSubmit,
  handleFacebook,
  handleGoogle
}) => {
  return (
    <div className={style.bgcontainer}>
      <div className={style.container}>
        <div>
          <div className={style.logo}>
            Site <span className={style.yLogo}>1 9 0 5</span>
          </div>
        </div>
        <div className={style.login}>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
          ></input>
          <br/>
          <br/>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          ></input>
                <br/>
          <br/>
          <input
            type="button"
            value="Login"
            onClick={handleSubmit}
          ></input>
          <br></br>
          <input
            type="button"
            value="Login whit FACEBOOK"
            onClick={handleFacebook}
          ></input>
          <br></br>
          <input
            type="button"
            value="Login with GOOGLE"
            onClick={handleGoogle}
          ></input>
        </div>
      </div>
    </div>
  );
};
