const express = require("express");
const router = express.Router();
const userRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const categoriesRouter = require("./categoriesRouter");
const cartsRouter = require("./cartsRouter");

router.use("/users", userRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/carts", cartsRouter);

module.exports = router;
