/* IMPORTS */
// Config
import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// Components
import AdminNavbar from "./components/AdminNavbar/Navbar";
import AdminPanelContainer from './components/AdminPanel/AdminPanelContainer'
import AdminCategoriesContainer from "./components/AdminCategory/AdminCategoriesContainer";
import AdminUsersContainer from "./components/AdminUser/AdminUsersContainer";
import AdminProductsContainer from "./components/AdminProduct/AdminProductsContainer";
import AdminProductContainer from "./components/AdminProduct/AdminProductContainer";
import AdminFooter from "./components/AdminFooter/Footer";
// Functions
import { hiUser, logoutUser} from "./store/action-creators/users";
import { setMyCart, setCarts } from "./store/action-creators/carts";

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = (dispatch) => ({
  hiUser: () => dispatch(hiUser()),
  logoutUser: () => dispatch(logoutUser()),
  setMyCart: (cart) => dispatch(setMyCart(cart)),
  setCarts: (list) => dispatch(setCarts(list)),
});

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.logoutSubmitHandler = this.logoutSubmitHandler.bind(this)
  }

  logoutSubmitHandler(){
    this.props.logoutUser()
    .then(()=>{
      this.props.setMyCart({})
      this.props.setCarts([])
    })
  }

  componentDidMount(){
    this.props.hiUser()
  }

  render() {
    return (
      <>
        <AdminNavbar me={this.props.users.me} logoutSubmitHandler={this.logoutSubmitHandler}/>
        <Switch>
            <Route path="/admin/categories" component={AdminCategoriesContainer}/>
            <Route path="/admin/users" component={AdminUsersContainer} />
            <Route path="/admin/products/add" component={AdminProductContainer}/>
            <Route path="/admin/products/:id" component={AdminProductContainer}/>
            <Route path="/admin/products" component={AdminProductsContainer}/>
            <Route path="/admin" component={AdminPanelContainer}/>
        </Switch>
        <AdminFooter />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
