/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
// Components
import Order from '../Order/Order'
// Functions
import { updateOrder, removeOrder } from '../../store/action-creators/carts'
import { getStock } from '../../../utils'

const mapDispatchToProps = dispatch =>  ({
    updateOrder: (index, orderId, units) => dispatch(updateOrder(index, orderId, units)),
    removeOrder: (id) => dispatch(removeOrder(id))
});

class OrderContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            units: 0,
            updated: false,
        }
        this.changesHandler = this.changesHandler.bind(this)
        this.updateHandler = this.updateHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
    }

    changesHandler(e){
        e.target.value > 0 && e.target.value <= this.props.order.product.stock
        ?   this.setState({
                updated: this.props.order.units != e.target.value,
                units: e.target.value,
            })
        :   e.target.value > this.props.order.product.stock ? console.warn('No stock avaliable') : null
    }

    updateHandler(){
        const { order, index, updateOrder } = this.props
        updateOrder(index, order.id, this.state.units)
        this.setState({updated: false})
    }

    deleteHandler(id){this.props.removeOrder(id)}

    componentDidMount(){
        const availableStock = getStock(this.props.order.product.stock, this.props.order.units)
        availableStock.available
        ? this.setState({units: this.props.order.units})
        : availableStock.stock > 0 
            ? this.setState({units: availableStock.stock})
            : (
                console.warn(`No stock available for ${this.props.order.product.name}. Created at: ${this.props.order.updatedAt}`),
                this.deleteHandler(this.props.order.id)
            )
    }

    componentDidUpdate(prevProps){
        prevProps.order.units != this.props.order.units
        ? this.setState({units: this.props.order.units})
        : null
    }
    
    render() {
        return <Order
                    index={this.props.index} 
                    order={this.props.order}
                    units={this.state.units}
                    changesHandler = {this.changesHandler}
                    updateHandler = {this.updateHandler}
                    deleteHandler = {this.deleteHandler}
                    updated={this.state.updated}
                />
    }
}

export default connect(null, mapDispatchToProps)(OrderContainer);