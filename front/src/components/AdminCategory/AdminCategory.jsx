/* IMPORTS */
// Config
import React from 'react'
import style from './style.css'
// Components
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

export default ({
    index,
    category,
    name,
    updated,
    changesHandler,
    updateHandler,
    deleteHandler,
}) => (
    <div className = {`${style.category} ${index % 2 ? style.odd : style.pair}`}>
        <form onSubmit={updateHandler} className={`${style.form} ${updated ? style.updated : null}`}>
            <input placeholder={'Category name'} onChange={changesHandler} className={`${style.name} ${style.store}`} type='text' value={name}/>
        </form>
        <div className = {`${style.section} ${style.buttons}`}>
            { updated ? <div className={`${style.icon} ${style.update}`} onClick={updateHandler}><CreateTwoToneIcon/></div> : null }
            <div className={`${style.icon} ${style.delete}`} onClick={()=>deleteHandler(category.id)}><DeleteForeverTwoToneIcon/></div>
        </div>
    </div>
)