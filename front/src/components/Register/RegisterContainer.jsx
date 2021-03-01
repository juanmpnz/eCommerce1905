import Register from "./Register";
import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../../store/action-creators/users";
const mapDispatchToProps = (dispatch, ownProps) => {
  // const history = ownProps.history;
  return {
    registerUser: (data) => registerUser(data),
  };
};
class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      adress: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props
      .registerUser(this.state)
      .then(() => this.props.history.push("/"));
  }
  render() {
    return (
      <div>
        <Register
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(RegisterContainer);
