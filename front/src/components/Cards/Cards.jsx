import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 250,
    maxWidth: 285,
    display: "flex",
    justifyContent: "center",
    margin: "10px 10px 10px 10px",
    float: "left",
  },
  media: {
    height: 285,
  },
});

export default ({ productsList }) => {
  const classes = useStyles();
  return productsList
    ? productsList.map((product) => {
        return (
          <Link to={`/products/${product.id}`}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  /*  image="/static/images/cards/contemplative-reptile.jpg" */
                  image={
                    product.images && product.images[0]
                      ? product.images[0].url
                      : "https://www.newcasmont.com/12616-home_default/virulana-escobillon-rincones.jpg"
                  }
                  title="1905 - eCommerce"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {'$'+product.price} <br />
                    {product.off > 0 ? product.off + "% OFF" : null}
                  </Typography>
                  <br/>
              
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        );
      })
    : null;
};
