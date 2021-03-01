import React from "react";
import style from "./RegisterStyle.css";
const Register = (props) => {
  return (
    <div className={style.bgcontainer}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.logo}>
            Site <span>1 9 0 5</span>
          </div>
        </div>
        <div className={style.login}>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={props.handleChange}
          ></input>     <br/>
          <br/>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={props.handleChange}
          ></input>     <br/>
          <br/>
          <input
            type="text"
            placeholder="phone"
            name="phone"
            onChange={props.handleChange}
          ></input>     <br/>
          <br/>
          <input
            type="text"
            placeholder="adress"
            name="adress"
            onChange={props.handleChange}
          ></input>     <br/>
          <br/>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={props.handleChange}
          ></input>     <br/>
          <br/>
          <input
            type="button"
            value="Register"
            onClick={props.handleSubmit}
          ></input>     <br/>
          <br/>
        </div>
      </div>
    </div>
  );
};
export default Register;
