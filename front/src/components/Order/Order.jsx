/* IMPORTS */
// Config
import React from "react";
import style from "./style.css";
// Components
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

export default ({
  index,
  order,
  units,
  changesHandler,
  updateHandler,
  deleteHandler,
  updated,
}) => (
  <div className={`${style.order} ${index % 2 ? style.odd : style.pair}`}>
    <form className={`${style.form} ${updated ? style.updated : null}`}>
      <input
        className={`${style.section} ${style.product}`}
        type="text"
        value={order.product.name}
        disabled
      />
      <input
        className={style.section}
        type="text"
        value={`$${order.product.price}`}
        disabled
      />
      <input
        className={`${style.section} ${style.units}`}
        type="number"
        value={units}
        onChange={changesHandler}
      />
      <input
        className={`${style.section} ${style.subtotal}`}
        type="text"
        value={`$${(order.product.price * units * (1-order.product.off/100)).toFixed(2)}`}
        disabled
      />
    </form>
    <div className={`${style.section} ${style.buttons}`}>
      {updated ? (
        <div
          className={`${style.icon} ${style.update}`}
          onClick={updateHandler}
        >
          <AddCircleTwoToneIcon />
        </div>
      ) : null}
      <div
        className={`${style.icon} ${style.delete}`}
        onClick={() => deleteHandler(order.id)}
      >
        <DeleteForeverTwoToneIcon />
      </div>
    </div>
  </div>
);
