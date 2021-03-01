/* IMPORTS */
// Config
import React from "react";
import { connect } from "react-redux";
// Components
import OrderContainer from "../Order/OrderContainer";
import Empty from "../Order/Empty";
import globalStyle from "../../styles/style.css";
import style from "./style.css";
// Functions
import {
  fetchMyCart,
  addCartToMyList,
} from "../../store/action-creators/carts";
import { submitCart } from "../../../utils";

const mapStateToProps = (state) => ({
  carts: state.carts,
  user: state.users.me,
});

const mapDispatchToProps = (dispatch) => ({
  addCartToMyList: (cart) => dispatch(addCartToMyList(cart)),
  fetchMyCart: () => dispatch(fetchMyCart()),
});

class MyCartContainer extends React.Component {
  constructor() {
    super();

    this.submitPurchase = this.submitPurchase.bind(this);
  }

  submitPurchase(purchaseId, orders) {
    !orders[0]
      ? console.warn("The submited cart was empty.")
      : submitCart(purchaseId, orders, this.props.user).then((res) => {
          this.props.addCartToMyList(res.data);
          this.props.fetchMyCart();
          this.props.history.push("/");
        });
  }

  render() {
    const { myCart } = this.props.carts;
    return (
      <div>
        <h1 className={globalStyle.h1}>
          My cart{" "}
          {myCart.purchase ? `#${myCart.purchase.id}` : "has no products yet"}
        </h1>
        <div className={style.orders}>
          {myCart.orders && myCart.orders[0] ? (
            myCart.orders.map((order, index) => (
              <OrderContainer key={order.id} order={order} index={index} />
            ))
          ) : (
            <Empty />
          )}
          <button
            className={style.button}
            onClick={() =>
              confirm("Submit order?")
                ? this.submitPurchase(myCart.purchase.id, myCart.orders)
                : null
            }
          >
            SUBMIT ORDER
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCartContainer);
