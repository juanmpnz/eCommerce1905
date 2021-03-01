/* IMPORTS */
// Config
import React from 'react'
import style from './style.css'
// Components
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';


export default ({
    name,
    email,
    phone,
    adress,
    password,
    access,
    updated,
    changesHandler,
    updateHandler,
    deleteHandler,
    userId,
    index,
}) => (
    <div className = {`${style.user} ${index % 2 ? style.odd : style.pair}`}>
            <form onSubmit={updateHandler} className={`${style.form} ${updated ? style.updated : null}`}>
                <input name='name' type='text' placeholder={'User name'} value={name} onChange={changesHandler}></input>
                <input name='email' onChange={changesHandler} type='email' value={email} placeholder='Email'/>
                <input name='phone' onChange={changesHandler} type='text' value={phone} placeholder='Phone'/>
                <input name='adress' onChange={changesHandler} type='text' value={adress} placeholder='Adress'/>
                <input name='password' onChange={changesHandler} type='password' value={password} placeholder='Password' disabled/>
                <select name='access' onChange={changesHandler} className={`${style.access}`} value={access}>
                    <option value={'basic'}>User</option>
                    <option value={'admin'}>Admin</option>
                    <option value={'super'}>Super-admin</option>
                </select>
            </form>
            <div className = {`${style.section} ${style.buttons}`}>
            { updated ? <div className={`${style.icon} ${style.update}`} onClick={updateHandler}><CreateTwoToneIcon/></div> : null }
            <div className={`${style.icon} ${style.delete}`} onClick={()=>deleteHandler(userId)}><DeleteForeverTwoToneIcon/></div>
        </div>
    </div>
)