import React from "react";
import {Link}  from "react-router-dom";
import Style from "../ErrorPage/style.css";
import BlockIcon from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';

export default () => (
  <div className={Style.container}>
   <div className={Style.error}>
   <BlockIcon style={{fontSize : 180}}/>
   <h2>Access Denied</h2>
   <Link to="/"  style={{ textDecoration: 'none' }}> <Button variant="contained">Home</Button></Link>
  
   </div>

  </div>
);
