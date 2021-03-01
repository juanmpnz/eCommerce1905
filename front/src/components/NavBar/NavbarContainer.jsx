import React from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { logoutUser } from "../../store/action-creators/users";

import {hideLoader, showLoader} from '../../store/action-creators/categories'

import { setMyCart, setCarts } from "../../store/action-creators/carts";


const mapStateToProps = state => ({
  categories: state.categories,
  products: state.products,
  users: state.users,
  carts: state.carts
})

const mapDistpachToProps = dispatch => ({
    hideLoader: () => dispatch(hideLoader()),
    showLoader: () => dispatch(showLoader()),
    logoutUser: () => dispatch(logoutUser()),
    setMyCart: (cart) => dispatch(setMyCart(cart)),
    setCarts: list => dispatch(setCarts(list))

})

const handleSubmit = e => {
  e.preventDefault();
  const value = evt.target.value;
  console.log(value);
};

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.setEstado = this.setEstado.bind(this);
    this.updateProfile = this.updateProfile.bind(this)
    this.logoutHandler = this.logoutHandler.bind(this)

  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  setEstado() {
    this.setState({ input: "" });
  }

  updateProfile(){
    console.log(this.props)
     this.props.showLoader()

    setTimeout(()=>{
      this.props.hideLoader()

    }, 350)

  }
  
  logoutHandler(){
    this.props.logoutUser()
    .then(()=>{
      this.props.setMyCart({})
      this.props.setCarts([])
    })
    console.log('LAS PROPS: ', this.props)
  }

  render() {
    const notificacion = this.props.carts.myCart.orders && this.props.carts.myCart.orders.length   
    const inputValue = this.state.input ? this.state.input : null;
    const { users, categories, products } = this.props
    const filterProducts = products.list.filter(product => product.name.match(inputValue));
    return (
      <div>
        <Navbar
          filterProducts={filterProducts}
          userAccess={users.me.access}
          userId={users.me.id}
          userIdFacebook={users.me.facebookId}
          userIdGoogle={users.me.googleId}
          logoutHandler={this.logoutHandler}
          handleInput={this.handleInput}
          onChange={handleSubmit}
          setEstado={this.setEstado}
          userName={users.me.name}
          categories = {categories.list}
          preloader={this.updateProfile}
          notificacion={notificacion}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDistpachToProps)(NavbarContainer);
