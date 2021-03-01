/* IMPORTS */
// Config
import React from "react";
import { connect } from "react-redux";
// Components
import Login from "./Login";
// Functions
import { loginUser } from "../../store/action-creators/users";
import { fetchMyCart, fetchCarts } from "../../store/action-creators/carts";

const mapDispatchToProps = dispatch => ({
  loginUser: (data) => dispatch(loginUser(data)),
  fetchMyCart: () => dispatch(fetchMyCart()),
  fetchCarts: () => dispatch(fetchCarts()),
})

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleGoogle = this.handleGoogle.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state)
      .then(() => Promise.all([
        this.props.fetchMyCart(),
        this.props.fetchCarts()
      ]).then(()=>this.props.history.push("/"))
    );
  }
  
  handleFacebook() {
    window.location="http://localhost:1905/auth/facebook"
  }
  handleGoogle(){
    window.location="http://localhost:1905/auth/google"
  }

  render() {
    return (
      <div>
        <Login
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleFacebook={this.handleFacebook}
          handleGoogle={this.handleGoogle}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LoginContainer);
