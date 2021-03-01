import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import style from "./NavbarStyle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "red",
  },
  lnk: {
    textDecoration: "none",
    color: "white",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontFamily: "Staatliches, cursive",
      fontSize: 35,
      backgroundColor: "#F9C312",
      padding: "0px 5px",
      borderRadius: 5,
      textShadow: "2px 2px grey",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },

  },  notificacion : {
    color:"black",
    margin: 0,
    fontWeight: 600,
    fontSize:15,
    paddingTop:1,
    position: "absolute",
    top: 36,
    left: "98%",
    width: 22,
    height: 22,
    backgroundColor: "#F9C312",
    textDecoration: "none",
    borderRadius: 100,
    textAlign: "center",

  
  },
   name: {
    marginLeft: 22,
    marginTop: 5,
    color: "whiteSmoke",
  }
}));

export default function PrimarySearchAppBar({
  handleInput,
  logoutHandler,
  userId,
  userIdFacebook,
  userIdGoogle,
  filterProducts,
  userAccess,
  setEstado,
  userName,
  categories,
  preloader,
  notificacion
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProductsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>req.user.name</MenuItem>
      <MenuItem onClick={handleMenuClose}>req.user.cart</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
      
        <MenuItem onClick={handleProfileMenuOpen}>
     
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
     
  
    </Menu>
  );

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static" style={style.AppBar}>
          <Toolbar>
            <Link to="/" style={style.imageContainer} >
              <img style={style.logo} alt="1905" src="/logo.png" />
            </Link>
            <div style={style.search}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  style={style.inputBase}
                  onChange={(e) => handleInput(e)}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div style={style.list}>
                {filterProducts
                  ? filterProducts.map((product) => {
                      return (
                        <div>
                          <Link
                            onClick={() => setEstado()}
                            style={style.LinkSearch}
                            to={`/products/${product.id}`}
                          >
                            <div style={style.Padre}>
                              <img
                                style={style.imagenDeProducto}
                                src={
                                  product.images && product.images[0]
                                    ? `${product.images[0].url}`
                                    : "https://www.newcasmont.com/12616-home_default/virulana-escobillon-rincones.jpg"
                                }
                              />
                              <span style={style.productName}>
                                {product.name}
                              </span>
                            </div>
                          </Link>
                          <hr></hr>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {console.log("USER ACCESS", userAccess)}
              {userId || userIdFacebook || userIdGoogle ? (
                <div>
                  
                  <Button
                    variant="contained"
                    color="default"
                    style={style.button}
                    onClick={logoutHandler}
                  >
                    Log Out
                  </Button>
                  {userAccess == "admin" || userAccess == "super" ? (
                    <Link style={style.link}  to="/admin">
                    <Button
                      variant="contained"
                      color="default"
                      style={style.button}
                    >
                      Panel Admin
                    </Button>
                    </Link>
                    
                  ) : null}
                </div>
              ) : (
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    style={style.button}
                  >
                    <Link style={style.link} from="/" to="/login">
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    style={style.button}
                  >
                    <Link style={style.link} from="/" to="/register">
                      Register
                    </Link>
                  </Button>
                </div>
              )}
                {userId || userIdFacebook || userIdGoogle ?
                <Link to="/mycarts">
                <img
                              style={style.buttonUserCart}
                              edge="end"
                              aria-label="account of current user"
                              aria-controls={menuId}
                              aria-haspopup="true"
                              src="https://bocashop.vteximg.com.br/arquivos/account.png"
                              alt=""
                              srcset=""
                            />
                </Link> : null}
                          

              <Link to="/mycart">
                <img
                  style={style.buttonUser}
                  edge="end"
                  aria-label="Cart of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  src="http://www.bocashop.vteximg.com.br/arquivos/minicart-bocashop-2.png"
                  alt=""
                  srcset=""
                />
              {userId || userIdFacebook || userIdGoogle ?  <div className={classes.notificacion}>{notificacion}</div> : null } 
              </Link>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <div className={classes.root}>
        <AppBar position="static" style={style.AppBar2}>   
       { (userId || userIdFacebook || userIdGoogle) ?  <div className={classes.name}>Bienvenido {userName}!</div> : null}
          <div style={style.NavBarList}>

              {categories? categories.map((cat)=>{
               return(
                <Link style={style.link} to={`/products/categories/${cat.name}`}>
                <Button
                  key={cat.id}
                  onClick={preloader}
                  style={style.Item}
                  aria-controls="simple-menu"
                  aria-haspopup="true" >
                  {cat.name}
                </Button>
               </Link>
               )

              }):null}
          </div>
       
        </AppBar>
      </div>
    </div>
  );
}
