/* IMPORTS */
// Config
import React from "react";
import { connect } from "react-redux";
// Components
import Cards from "../Cards/Cards"; 
import style from './style.css'
import Preloader from "../Preloader/Preloader"
// Functions 
import {fetchCategory} from '../../store/action-creators/categories'

const mapStateToProps = (state) => ({
    products: state.products,
    categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategory: name => dispatch(fetchCategory(name))
})

class ProductsContainer extends React.Component {
  componentDidMount(){
    this.props.fetchCategory(this.props.match.params.name)
  }

  componentDidUpdate(prevProps){
    const prevParam = prevProps.match.params.name 
    prevProps.match.params.name !== this.props.match.params.name
    ? this.props.fetchCategory(this.props.match.params.name)
    :null
  }
  render() {
    const { selectedCategory } = this.props.categories
    return selectedCategory.category && selectedCategory.products
    ? <div className={style.container}>
        <div className={style.header}>
          <h2 className={style.title}><span className={style.subtitle}></span>{selectedCategory.category.name}</h2>
        </div>
        <div className={style.products}>
          <Cards productsList={selectedCategory.products}/>
        </div>
      </div>
    : null
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
