const express = require('express')
const router = express.Router()
const passport = require('passport')
const {
    getUsers,
    getSingleUser,
    addSingleUser,
    updateSingleUser,
    deleteSingleUser,
    userValidation,
    accessValidation,
    getSessionUser,
    logoutUser
} = require('./controllers/user-controllers')

router.get("/", getUsers);
router.post("/", addSingleUser);
router.get("/me", userValidation, getSessionUser);
router.get("/:id", getSingleUser);
router.put("/:id", /*accessValidation,*/ updateSingleUser);
router.delete("/:id", /*accessValidation,*/ deleteSingleUser);
router.post("/login", passport.authenticate("local"), userValidation, getSessionUser);
router.post("/logout", logoutUser);

module.exports = router;
