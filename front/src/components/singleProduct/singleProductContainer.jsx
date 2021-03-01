/* IPORTS */
// Config
import React from "react";
import { connect } from "react-redux";
// Components
import SingleProduct from "./singleProduct";
// Functions
import {
  fetchSelectedProduct,
  deleteProduct,
  fetchItsComments,
  addComment,
  deleteComment,
  createRating,
} from "../../store/action-creators/products";
import { addOrder } from "../../store/action-creators/carts";

const mapStateToProps = (state) => ({
  carts: state.carts,
  products: state.products,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSelectedProduct: (id) => dispatch(fetchSelectedProduct(id)),
  deleteProduct: (id) => dispatch(deleteProduct(id)),
  fetchItsComments: (productId) => dispatch(fetchItsComments(productId)),
  addComment: (productId, content) => dispatch(addComment(productId, content)),
  deleteComment: (id) => dispatch(deleteComment(id)),
  createRating: (productId, rate) => dispatch(createRating(productId, rate)),
  addOrder: (cartId, productId, units) =>
    dispatch(addOrder(cartId, productId, units)),
});

class singleProductCotainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      units: 0,
      contador: 0,
      imagenPrincipal: "",
    };
    this.imageChangeHandler = this.imageChangeHandler.bind(this);
    this.changesHandler = this.changesHandler.bind(this);
    this.submitOrderHandler = this.submitOrderHandler.bind(this);
    this.submitMessageHandler = this.submitMessageHandler.bind(this);
    this.updateProductHandler = this.updateProductHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  imageChangeHandler(e) {
    this.setState({
      imagenPrincipal: e.currentTarget.src,
      contador: this.state.contador + 1,
    });
  }

  changesHandler(e) {
    const { stock } = this.props.products.selectedProduct;
    e.target.name === "units" && (e.target.value > stock || e.target.value < 0)
      ? console.warn("Invalid stock input")
      : this.setState({
          [e.target.name]: e.target.value,
          updated: true,
        });
  }

  submitOrderHandler(e) {
    e.preventDefault();
    const { carts, products } = this.props;
    this.state.units > 0
      ? this.props.addOrder(
          carts.myCart.purchase.id,
          products.selectedProduct.id,
          this.state.units
        )
      : console.warn("Cannot add 0 units");
  }

  submitMessageHandler(e) {
    e.preventDefault();
    this.state.comment != ""
      ? this.props
          .addComment(
            this.props.products.selectedProduct.id,
            this.state.comment
          )
          .then(() => this.setState({ comment: "", updated: false }))
      : console.warn("Comment input is empty");
  }

  updateProductHandler(id) {
    this.props.history.push(`/admin/products/${id}`);
  }
  deleteHandler(id) {
    this.props
      .deleteProduct(id)
      .then(() => this.props.history.push("/admin/products"));
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchSelectedProduct(this.props.match.params.id),
      this.props.fetchItsComments(this.props.match.params.id),
    ]);
  }

  componentDidUpdate(prevProps) {
    prevProps.match.params.id !== this.props.match.params.id 
    ? Promise.all([
        this.props.fetchSelectedProduct(this.props.match.params.id),
        this.props.fetchItsComments(this.props.match.params.id),
      ])
    : null
  }

  render() {
    const { selectedProduct, itsComments } = this.props.products;
    const { me } = this.props.users;
    return (
      <SingleProduct
        selectedProduct={selectedProduct}
        itsComments={itsComments}
        me={me}
        units={this.state.units}
        comment={this.state.comment}
        imageChangeHandler={this.imageChangeHandler}
        changesHandler={this.changesHandler}
        submitOrderHandler={this.submitOrderHandler}
        submitMessageHandler={this.submitMessageHandler}
        updateProductHandler={this.updateProductHandler}
        deleteHandler={this.deleteHandler}
        deleteComment={this.props.deleteComment}
        createRating={this.props.createRating}
        contador={this.state.contador}
        imagenPrincipal={this.state.imagenPrincipal}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(singleProductCotainer);
