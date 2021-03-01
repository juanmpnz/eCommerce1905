/* IMPORTS */
// Config
import React from "react";
import { Route, Switch, Redirect, component } from "react-router-dom";
import { connect } from "react-redux";
// Components
import NavbarContainer from "./components/NavBar/NavbarContainer";
import PreContainer from "./components/prefooter/PreContainer";
import FooterContainer from "./components/footer/FooterContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import LoginContainer from "./components/Login/LoginContainer";
import singleProductContainer from "./components/singleProduct/singleProductContainer";
import HomeContainer from "./components/Home/HomeContainer";
import ProductsContainer from "./components/Products/ProductsContainer";
import Contactus from "./components/Contactus/Contactus";
import MyCartContainer from "./components/MyCart/MyCartContainer";
import NotFound from "../src/components/ErrorPage/NotFound"
import SingleCartsContainer from './components/MyCarts/SingleCartsContainer'
import selectedCartContainer from './components/MyCarts/selectedCartContainer'
import NotAccsess from "./components/ErrorPage/NotAccsess";
import Preloader from "./components/Preloader/Preloader";
// Functions
import { hiUser } from "./store/action-creators/users";
import { fetchCategories } from "./store/action-creators/categories";
import { fetchMyCart, fetchCarts } from "./store/action-creators/carts";



const mapDispatchToProps = (dispatch) => ({
  hiUser: () => dispatch(hiUser()),
  fetchMyCart: () => dispatch(fetchMyCart()),
  fetchCarts: () => dispatch(fetchCarts()),
  fetchCategories : ()=> dispatch(fetchCategories())
});

class Main extends React.Component {
  
  componentDidMount(){
    this.props.hiUser().then(() => { this.props.fetchMyCart() ; this.props.fetchCarts() }) 
    this.props.fetchCategories()
  }

  render() {
    return (
      <>
        <NavbarContainer />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/products/categories/:name" component={ProductsContainer}/>
          <Route path="/products/:id" component={singleProductContainer}/>
          <Route path="/mycart" component={MyCartContainer} />
          <Route path="/mycarts/:id" component={selectedCartContainer} />
          <Route path="/mycarts" component={SingleCartsContainer} />
          <Route exact path="/contactus" component={Contactus} />
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/notaccsess" component={NotAccsess} />
          <Route exact path="/preloader" component={Preloader} />
          <Route component={NotFound} />
        </Switch>
        <FooterContainer />
        <Preloader/>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);
