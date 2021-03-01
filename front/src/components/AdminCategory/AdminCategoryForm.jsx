/* IMPORTS */
// Config
import React from 'react'
import style from './style.css'
// Components
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';


export default ({
    name,
    changesHandler,
    submitHandler
}) => (
    <div className = {`${style.category} ${style.new}`}>
            <form onSubmit={e =>{e.preventDefault();submitHandler(name)}} className={`${style.form}`}>
                <input placeholder={'Category name'} onChange={changesHandler} className={`${style.name}`} type='text' value={name}/>
            </form>
            <div className = {`${style.section} ${style.buttons}`}>
                <div className={`${style.icon} ${style.create}`} onClick={()=>submitHandler(name)}><AddCircleTwoToneIcon/></div>
            </div>
    </div>
)