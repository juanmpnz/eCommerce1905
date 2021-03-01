/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
// Components
import AdminCategory from './AdminCategory'
import {updateCategory, deleteCategory}from '../../store/action-creators/categories'
  
const mapDispatchToProps = dispatch =>  ({
  updateCategory: (index, id, name) => dispatch(updateCategory(index, id, name)),
  deleteCategory: (id) => dispatch(deleteCategory(id)),
});

class AdminCategoryContainer extends React.Component {
    constructor(){
      super()

      this.state = {
        name: '',
        updated: false
      }
      this.changesHandler = this.changesHandler.bind(this)
      this.updateHandler = this.updateHandler.bind(this)
      this.deleteHandler = this.deleteHandler.bind(this)
    }

    changesHandler(e){
        this.setState({
            updated: this.props.category.name != e.target.value,
            name: e.target.value,
        })
    }

    updateHandler(e){
        e.preventDefault()
        const {category, index} = this.props
        this.state.name === ''
        ? console.error('Input name can not be empty')
        : ( this.props.updateCategory(index, category.id, this.state.name),
            this.setState({updated: false}))
    }

    deleteHandler(id){this.props.deleteCategory(id)}


    componentDidMount(){
        this.setState({name: this.props.category.name})
    }
    componentDidUpdate(prevProps){
        prevProps.category.name != this.props.category.name
        ? this.setState({name: this.props.category.name})
        : null
    }
  
    render() {
        return <AdminCategory
                    category={this.props.category}
                    index={this.props.index}
                    name={this.state.name}
                    updated={this.state.updated}
                    changesHandler={this.changesHandler}
                    updateHandler={this.updateHandler}
                    deleteHandler={this.deleteHandler}
                />          
      }
  }

export default connect(null, mapDispatchToProps)(AdminCategoryContainer);