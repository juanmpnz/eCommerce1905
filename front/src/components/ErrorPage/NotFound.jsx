import React from "react";
import {Link}  from "react-router-dom";
import Style from "../ErrorPage/style.css";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Button from '@material-ui/core/Button';

export default () => (
  <div className={Style.container}>
   <div className={Style.error}>
   <ErrorOutlineIcon style={{fontSize : 180}}/>
   <h2>404 - Page Not Found</h2>
   <Link to="/"  style={{ textDecoration: 'none' }}> <Button variant="contained">Home</Button></Link>
  
   </div>

  </div>
);
