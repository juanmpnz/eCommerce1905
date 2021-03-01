/* IMPORTS */
// Config
import React from 'react'
import style from './style.css'
// Components
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';


export default ({
    name,
    email,
    phone,
    adress,
    password,
    access,
    changesHandler,
    submitHandler
}) => (
    <div className = {`${style.user} ${style.new}`}>
            <form onSubmit={submitHandler} className={`${style.form}`}>
                <input name='name' type='text' placeholder={'User name'} value={name} onChange={changesHandler}></input>
                <input name='email' onChange={changesHandler} type='email' value={email} placeholder='Email'/>
                <input name='phone' onChange={changesHandler} type='text' value={phone} placeholder='Phone'/>
                <input name='adress' onChange={changesHandler} type='text' value={adress} placeholder='Adress'/>
                <input name='password' onChange={changesHandler} type='password' value={password} placeholder='Password'/>
                <select name='access' onChange={changesHandler} className={`${style.access}`} value={access}>
                    <option value={'basic'}>User</option>
                    <option value={'admin'}>Admin</option>
                    <option value={'super'}>Super-admin</option>
                </select>
            </form>
            <div className = {`${style.section} ${style.buttons}`}>
                <div className={`${style.icon} ${style.create}`} onClick={submitHandler}><AddCircleTwoToneIcon/></div>
            </div>
    </div>
)