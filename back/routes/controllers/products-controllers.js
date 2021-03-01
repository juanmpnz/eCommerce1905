const { Op } = require("sequelize");
const {
  Product,
  Comment,
  Rate,
  Image,
  Category,
  User,
} = require("../../models");

const getProducts = (req, res, next) => {
  Product.findAll({ where: req.query, include: Image })
    .then((productos) => {
      res.send(productos);
    })
    .catch(next);
};
// SINGLE PRODUCT'S ROUTES
const getSingleProduct = (req, res, next) => {
  Product.findByPk(req.params.id, { include: [Rate, Image, Category] })
    .then((data) => res.send(data))
    .catch(next);
};
// -> util
const setCategories = (formCategories, product, res) => {
  return formCategories
    ? product
        .setCategories(formCategories)
        .then(() => res.status(201).send(product))
    : product.setCategories([]).then(() => res.status(201).send(product));
};
// util <-
const addSingleProduct = (req, res, next) => {
  const { name, description, price, stock, off, categories } = req.body;
  Product.create({ name, description, price, stock, off })
    .then((product) => setCategories(categories, product, res))
    .catch(next);
};
const updateSingleProduct = (req, res, next) => {
  const { name, description, price, stock, off, categories } = req.body;
  Product.findByPk(req.params.id)
    .then((product) => product.update({ name, description, price, stock, off }))
    .then((product) => setCategories(categories, product, res))
    .catch(next);
};
const deleteSingleProduct = (req, res, next) => {
  Promise.all([
    Comment.destroy({ where: { productId: req.params.id } }),
    Rate.destroy({ where: { productId: req.params.id } }),
    Product.findByPk(req.params.id).then((user) => {
      user.destroy();
    }),
  ])
    .then(() => res.sendStatus(200))
    .catch(next);
};

// PRODUCT'S IMAGES
const addImage = (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((product) =>
      product
        .createImage({ url: req.body.url })
        .then((image) => res.send(image))
    )
    .catch(next);
};
const deleteImage = (req, res, next) => {
  Image.findByPk(req.params.id)
    .then((image) => image.destroy().then(() => res.sendStatus(200)))
    .catch(next);
};

// PRODUCT'S COMMENTS
const addComment = (req, res, next) => {
  Comment.create({ 
    content: req.body.content,
    productId: req.params.id,
    userId: req.user.id
   })
    .then(comment => Comment.findByPk(comment.id, {include: User})
      .then(data => res.status(201).send(data))
    )
    .catch(next);
};

const deleteComment = (req, res, next) => {
  Comment.destroy({where: {id: req.params.id}})
  .then(()=> res.sendStatus(200))
  .catch(next)
}

const getComments = (req, res, next) => {
  Comment.findAll({
    where: { productId: req.params.id },
    include: User 
  })
    .then(comments => res.send(comments))
    .catch();
};

// PRODUCT'S RATES
const addRate = (req, res, next) => {
  req.user
  ? Rate.create({ ...req.body, productId: req.params.id, userId: req.user.id })
    .then(rate => res.status(201).send(rate))
    .catch(next)
  : res.sendStatus(401)
};
const deleteRate = (req, res, next) => {
  Rate.findByPk(req.body)
    .then((rate) => rate.destroy())
    .then((data) => res.send(data))
    .catch();
};

// USER'S ACCESS VALIDATIONS
const userValidation = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
const adminValidation = (req, res, next) => {
  req.user.access != "basic" ? next() : res.sendStatus(401);
};

module.exports = {
  getProducts,
  getSingleProduct,
  addSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  addImage,
  deleteImage,
  addComment,
  deleteComment,
  getComments,
  addRate,
  deleteRate,
  userValidation,
  adminValidation,
};
