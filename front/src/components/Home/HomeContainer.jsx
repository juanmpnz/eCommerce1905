import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
import { fetchProducts } from "../../store/action-creators/products";

const mapStateToProps = (state) => {
  return {
    list: state.products.list,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

class HomeContainer extends React.Component {
  
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <Home
          productsList={this.props.list}
          offList={this.props.list.filter(p => p.off > 0)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
