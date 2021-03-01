/* IMPORTS */
// Config
import React from 'react'
import style from './style.css'
// Components
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { Link } from 'react-router-dom';

export default ({
    products,
    deleteHandler,
}) => (
    <div className={style.products}>
        {products.map((product, index) => (
            <div className = {`${style.preview} ${index % 2 ? style.odd : style.pair}`}>
                <form onSubmit={e=>e.preventDefault()} className={`${style.content}`}>
                    <input className={style.name} type='text' value={product.name} disabled/>
                    <input className={style.data} type='text' value={`$${product.price}`} disabled/>
                    <input className={style.data} type='text' value={`${product.stock} in stock`} disabled/>
                    <input className={style.data} type='text' value={`${product.off}% OFF`} disabled/>
                </form>
                <div className = {style.buttons}>
                    <Link to={`/admin/products/${product.id}`} className={`${style.icon}`}>
                        <CreateTwoToneIcon style={{color: "black"}}/>
                    </Link>
                    <div className={`${style.icon} ${style.delete}`} onClick={()=>deleteHandler(product.id)}><DeleteForeverTwoToneIcon/></div>
                </div>
            </div>))
        }
    </div>
)