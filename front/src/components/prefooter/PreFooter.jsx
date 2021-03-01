import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {},
});

export default () => {
  const classes = useStyles();
  return (
    <div>
      <LocalShippingIcon
        fontSize="large"
        color="disabled"
        style={{ margin: 20 }}
      />
      <PaymentIcon fontSize="large" color="disabled" style={{ margin: 20 }} />
      <CheckBoxIcon fontSize="large" color="disabled" style={{ margin: 20 }} />
    </div>
  );
};
