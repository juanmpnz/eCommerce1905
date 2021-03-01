const express = require("express");
const router = express.Router();

const {
    getCategories,
    getSingleCategory,
    addSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
} = require('./controllers/categories-controllers')

router.get("/", getCategories);
router.post("/", addSingleCategory);
router.get("/:name", getSingleCategory);
router.put("/:id", updateSingleCategory);
router.delete("/:id", deleteSingleCategory);

module.exports = router;
