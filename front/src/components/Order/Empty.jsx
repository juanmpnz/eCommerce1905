/* IMPORTS */
// Config
import React from 'react'
import { Link } from 'react-router-dom'
// Components
import style from './style.css'

export default () => (
    <Link to='/' className={`${style.order} ${style.empty}`}>
        <img src="https://www.janeglobal.com/uploads/images/logo/shoppingempty.png" alt="empty"/>
        <h3>Your cart is empty</h3>
        <p>{`Add something to make me happy :)`}</p>
    </Link>
)