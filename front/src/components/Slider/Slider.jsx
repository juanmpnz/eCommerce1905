import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

class Slider extends React.Component {
  constructor(props) {
    super(props);
  }

  Item(item) {
    return (
      <Paper>
        <img
          className="img-slider"
          width="100%"
          src={item.url}
        ></img>
      </Paper>
    );
  }

  render() {
    var items = [
      {
        url:
          "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esCL/Images/plp-mini-masthead-1920x480both_tcm211-450864.jpg",
      },
      {
        url:
          "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/esAR/Images/MINI_MH_DT_tcm216-569716.jpg",
      },
    ];
    return (
      <Carousel>
        {items.map((item, i) => (
          <div key={i}>{this.Item(item)}</div>
        ))}
      </Carousel>
    );
  }
}

export default Slider;
