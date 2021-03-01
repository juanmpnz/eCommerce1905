import React from "react";
import SliderContainer from "../Slider/SliderContainer";
/* import CardsContainer from "../Cards/CardsContainer"; */
import style from "../../styles/style.css";
import Cards from "../Cards/Cards";
import styles from "../Cards/CardStyle";

export default function Home({ productsList, offList }) {
  console.log("HOME", productsList);
  return (
    <div>
      <SliderContainer />
      <h1 className={style.h1}>
        Productos
      </h1>
      <div style={styles.contenedor}>
        <Cards productsList={productsList} />
      </div>
      <h2 className={style.h1}>
        Productos en <span>oferta</span>
      </h2>
      <div style={styles.contenedor}>
        <Cards productsList={offList} />
      </div>
    </div>
  );
}
