const {User, Comment, Rate} = require("../../models");

const getUsers = (req, res, next) => {
  User.findAll({where: req.query})
    .then((data) => res.send(data))
    .catch(next);
};

// SINGLE USER'S ROUTES
const getSingleUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next);
};
const addSingleUser = (req, res, next) => {
  User.create(req.body)
    .then((data) => res.send(data))
    .catch(next);
};
const updateSingleUser = (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => user.update(req.body))
    .then((data) => res.send(data))
    .catch(next);
};
const deleteSingleUser = (req, res, next) => {
  Promise.all([
    Comment.destroy({where: {userId: req.params.id}}),
    Rate.destroy({where: {userId: req.params.id}}),
    User.findByPk(req.params.id).then(user => {user.destroy()})
  ])
  .then(() => res.sendStatus(200))
  .catch(next);
};

// USER VALIDATIONS
const userValidation = (req, res, next) => {
  req.user ? next() : res.sendStatus(401)
}
const accessValidation = (req, res, next) => {
  req.user.id === req.params.id || req.user.access === 'super' 
  ? next()
  : res.sendStatus(401)
}
const getSessionUser = (req, res, next) => {
  res.send(req.user)
};
const logoutUser = (req, res, next) => {
  req.logout();
  res.sendStatus(200);
};

module.exports = {
  getUsers,
  getSingleUser,
  addSingleUser,
  updateSingleUser,
  deleteSingleUser,
  userValidation,
  accessValidation,
  getSessionUser,
  logoutUser
  };