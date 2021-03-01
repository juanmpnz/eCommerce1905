/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
// Components
import AdminProduct from './AdminProduct'
// Functions
import {fetchSelectedProduct, addProduct, updateProduct, deleteProduct, deleteImage, addImage} from '../../store/action-creators/products'
import {fetchCategories} from '../../store/action-creators/categories'

const mapStateToProps = (state) => ({
    products: state.products,
    categories: state.categories
})
  
const mapDispatchToProps = dispatch =>  ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchSelectedProduct: id => dispatch(fetchSelectedProduct(id)),
    addProduct: product => dispatch(addProduct(product)),
    updateProduct: (id, product) => dispatch(updateProduct(id, product)),
    deleteProduct: id => dispatch(deleteProduct(id)),
    deleteImage: id => dispatch(deleteImage(id)),
    addImage: (productId, url) => dispatch(addImage(productId, url))
});

class AdminProductContainer extends React.Component {
    constructor(){
        super()
        this.state={
            name:'',
            description:'',
            price:'',
            stock:'',
            off:'',
            url:'',
            images: [],
            categories: [],
            updated: false
        }
        this.changesHandler=this.changesHandler.bind(this)
        this.toggleCategoryHandler=this.toggleCategoryHandler.bind(this)
        this.addHandler=this.addHandler.bind(this)
        this.updateHandler=this.updateHandler.bind(this)
        this.deleteHandler=this.deleteHandler.bind(this)
        this.discardHandler=this.discardHandler.bind(this)
        this.addUrlHandler=this.addUrlHandler.bind(this)
        this.deleteImageHandler=this.deleteImageHandler.bind(this)
    }

    changesHandler(e){
        (e.target.name !== 'name' & e.target.name !== 'description' && e.target.value < 0)
        || (e.target.name === 'off' && e.target.value > 100)
        ?   console.warn('Uncompleted input')    
        :   this.setState({
            [e.target.name]: e.target.value,
            updated: true})
    }

    toggleCategoryHandler(id){
        this.state.categories.includes(id) 
        ? this.setState({
            categories: this.state.categories.filter(c => c != id),
            updated: true
        })
        : this.setState({
            categories: [id, ...this.state.categories],
            updated: true
        })
    }

    addHandler(e){
        e.preventDefault()
        const {name, description, price, stock, off, images, categories} = this.state
        name === '' || description === '' || price === '' || stock === '' || off === ''
        ?   console.warn('Uncompleted input')  
        :   (this.props.addProduct({name, description, price, stock, off, categories})
                .then(res => {
                    Promise.all(images.map(url => this.props.addImage(res.product.id, url)))
                })
                .then(()=>this.props.history.push('/admin/products')),
            this.setState({
                name: '',
                description: '',
                price: '',
                stock: '',
                off: '',
                images: [],
                categories: [],
                updated: false
            }))
    }

    updateHandler(e){
        e.preventDefault()
        const {name, description, price, stock, off, categories} = this.state

        name === '' || description === '' || price === '' || stock === '' || off === ''
        ?   console.warn('Uncompleted input')    
        : ( this.props.updateProduct(this.props.match.params.id, {name, description, price, stock, off, categories}),
            this.setState({updated: false}) )
    }

    deleteHandler(id){
        this.props.deleteProduct(id)
            .then(()=>this.props.history.push('/admin/products'))
    }

    discardHandler(){
        this.props.history.push('/admin/products')
    }

    addUrlHandler(e){
        e.preventDefault();
        const productId = this.props.match.params.id
        this.state.url === ''
        ?   console.warn('Uncompleted input')  
        :   productId
                ? this.props.addImage(productId, this.state.url).then(()=>this.setState({
                    images: this.props.products.selectedProduct.images,
                    updated: false
                }))
                : this.setState({
                    images: [... this.state.images, this.state.url],
                    url: '',
                    updated: false
                })
    }

    deleteImageHandler(data){
        typeof data === 'number'
        ?   this.props.deleteImage(data)
            .then(() => this.setState({
                images: this.props.products.selectedProduct.images
            }))
        :   this.setState({images: this.state.images.filter(url => url != url)})
    }

    componentDidMount(){
        this.props.fetchCategories()
        this.props.match.params.id
        ? this.props.fetchSelectedProduct(this.props.match.params.id)
            .then(data => { 
                const{name, description, price, stock, off, images, categories} = data.selectedProduct
                this.setState({name, description, price, stock, off, images,
                    categories: categories.map(category => category.id)
                })
            })
        : null
    }

    render() {
        const {name, description, price, stock, off, url, images, categories, updated} = this.state
        return  <AdminProduct
                    productId={this.props.match.params.id}
                    name={name}
                    description={description}
                    price={price}
                    stock={stock}
                    off={off}
                    url={url}
                    images={images}
                    categories={categories}
                    categoriesList={this.props.categories.list}
                    changesHandler={this.changesHandler}
                    toggleCategoryHandler={this.toggleCategoryHandler}
                    addHandler={this.addHandler}
                    updateHandler={this.updateHandler}
                    deleteHandler={this.deleteHandler}
                    discardHandler={this.discardHandler}
                    addUrlHandler={this.addUrlHandler}
                    deleteImageHandler={this.deleteImageHandler}
                    updated={updated}
                />
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductContainer);