import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.css'


export default ({me, logoutSubmitHandler}) => (
    <div className={style.navbar}>
      <div className={style.imageContainer}>
        <Link to="/">
        <img alt="1905" src="/logo.png" />

        </Link>
      </div>
      <div className={style.menu}>
        <Link to="/admin/categories" className={style.navbarSection}>.categories</Link>
        <Link to="/admin/products" className={style.navbarSection}>.products</Link>
        <Link to="/admin/users" className={style.navbarSection}>.users</Link>
        <Link to="/admin" className={style.navbarSection} onClick={me.id ? logoutSubmitHandler : null}>{me.id? '.logout': '.login'}</Link>
      </div>
    </div>
)