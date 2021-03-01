/* IMPORTS */
// Config
import React from 'react'
// Components
import style from './style.css'

export default () => (
    <div className={`${style.empty}`}>
        <h2>{`:(`}</h2>
        <h3>Your users list is empty</h3>
        <p>{`Add -or invite- someone to make me happy ;)`}</p>
    </div>
)