/* IMPORTS */
// Config
import React from "react";
import { connect } from "react-redux";
// Components
import style from './style.css'
import NotAccess from '../ErrorPage/NotAccsess'
// Functions 
import {fetchSelectedCart} from '../../store/action-creators/carts'

const mapStateToProps = (state) => ({
    carts: state.carts,
    users: state.users,
});

const mapDispatchToProps = dispatch => ({
    fetchSelectedCart: id => dispatch(fetchSelectedCart(id))
})

class selectedCartContainer extends React.Component {
  componentDidMount(){
    this.props.fetchSelectedCart(this.props.match.params.id)
  }

  componentDidUpdate(prevProps){
    prevProps.match.params.id !== this.props.match.params.id
    ? this.props.fetchSelectedCart(this.props.match.params.id)
    : null
  }
  render() {
    const { selectedCart } = this.props.carts
    const { me } = this.props.users
    return selectedCart.purchase && selectedCart.purchase.userId === me.id
    ? <div className={style.container}>
        <div className={style.header}>
          <h2 className={style.title}><span className={style.subtitle}>My cart: </span>{selectedCart.purchase.id}</h2>
        </div>
        <div className={style.orders}>
          {
            selectedCart.orders.map( (order, index) =>
                <div className={`${style.singleCart} ${index % 2 ? style.odd : style.pair}`}>
                    <form className={`${style.form}`}>
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
                        value={order.units}
                        disabled
                    />
                    <input
                        className={`${style.section} ${style.subtotal}`}
                        type="text"
                        value={`$ ${order.subtotal}`}
                        disabled
                    />
                    </form>
                </div>
                )
          }
        </div>
        <div className={style.header}>
        <h2 className={style.title}>{`$ ${selectedCart.purchase.total}`}</h2>
        </div>
      </div>
    : <NotAccess/>
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(selectedCartContainer);
