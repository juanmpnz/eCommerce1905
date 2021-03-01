/* IMPORTS */
// Config
import React from 'react'
import { Link } from 'react-router-dom'
// Components
import style from './style.css'

export default () => (
    <Link to='/' className={`${style.alert}`}>
        <img src="https://static.thenounproject.com/png/53421-200.png" alt="unautorized"/>
        <h3>Where're you going to?</h3>
        <p>{`Not authorized :(`}</p>
    </Link>
)