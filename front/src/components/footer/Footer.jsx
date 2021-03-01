import React from "react";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import style from './style.css'

export default () => (
    <div className={style.footer}>
      <img alt="P5" src="/logoP5.png"/>   
             <ul style={style.contened2}>
            <InstagramIcon style={{margin : 10}}color="disabled" />
            <WhatsAppIcon  style={{margin : 10}}color="disabled" />
            <FacebookIcon  style={{margin : 10}}color="disabled" />
            <TwitterIcon  style={{margin : 10}}color="disabled" />
          </ul>
      <div className={style.footerName}>{'© 2020 Copyright - 1095 eCommerce'}</div>
    </div>
)
