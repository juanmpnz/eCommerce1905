/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// Components
import style from './style.css'
import AdminProductsPreview from './AdminProductsPreview'
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import Empty from './Empty'
import Unautorized from '../AdminPanel/Unautorized';
// Functions
import {fetchProducts, deleteProduct} from '../../store/action-creators/products'

const mapStateToProps = (state) => ({
    users: state.users,
    products: state.products
})
  
const mapDispatchToProps = dispatch =>  ({
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: id => dispatch(deleteProduct(id))
});

class AdminProductsContainer extends React.Component {

    constructor(){
        super()
        this.deleteHandler=this.deleteHandler.bind(this)
    }

    componentDidMount(){
      this.props.fetchProducts()
    }

    deleteHandler(id){this.props.deleteProduct(id)}
  
    render() {
        const {products} = this.props
        const {me} =this.props.users
          return (
            <div className={style.container}>
            {me.id && (me.access === 'admin' || me.access === 'super')
                ? <>
                    <div className={style.header}>
                        <h2 className={style.title}>Products</h2>
                        <Link className={style.new} to='/admin/products/add'>
                            <AddCircleTwoToneIcon style={{color: "black"}}/>
                        </Link>
                    </div>
                    {products.list && products.list[0] 
                        ?   <AdminProductsPreview
                                products={products.list}
                                deleteHandler={this.deleteHandler}
                            />
                        :   <Empty/>
                    }
                </>
                : <Unautorized/>}
            </div>
          )
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsContainer);