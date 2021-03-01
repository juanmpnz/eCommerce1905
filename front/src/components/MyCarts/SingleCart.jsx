import React from 'react'
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import style from './style.css'
export default ({cart, index, goHandler}) => {
    return(
        <div className={`${style.singleCart} ${index % 2 ? style.odd : style.pair}`}>
            <div className={style.date}>{cart.createdAt.slice(0,10)}</div>
            <div className={style.status}>{cart.status}</div>
            <div className={style.total}>${cart.total}</div>
            <button onClick={()=>goHandler(cart.id)} className={style.icon}><FindInPageTwoToneIcon/></button>
        </div>
    )
}