/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
// Components
import style from './style.css'
import SingleCart from './SingleCart'
import Empty from './Empty'

const mapStateToProps = (state) => ({
  carts: state.carts
})
  
class SingleCartsContainer extends React.Component {
    constructor(){
        super()
        this.goHandler=this.goHandler.bind(this)
    }

    goHandler(id){
        this.props.history.push(`/mycarts/${id}`)
    }

    render() {
        const { list } = this.props.carts
        return (
            <div className = {`${style.container}`}>
            {list[0] 
                ?   <div className={style.cartsContainer}>
                        <h2 className={style.header}>My carts</h2>
                            {
                                list.map((cart, index) => 
                                <SingleCart
                                    key={cart.id}
                                    cart={cart}
                                    index={index}
                                    goHandler={this.goHandler}
                                />)
                            }
                    </div>
                :   <Empty/>}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SingleCartsContainer);