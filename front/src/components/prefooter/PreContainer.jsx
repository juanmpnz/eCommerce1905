import React from "react";
import PreFooter from "../prefooter/PreFooter";
import style from "./PreStyle.js";

export default class CardsContainer extends React.Component {
  render() {
    return (
      <div style={style.contenedor}>
        <PreFooter />
      </div>
    );
  }
}
