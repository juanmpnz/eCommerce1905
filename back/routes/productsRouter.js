const express = require("express");
const router = express.Router();
const {
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
    adminValidation
} = require('./controllers/products-controllers')

router.delete("/images/:id", /*userValidation,*/ deleteImage);
router.delete("/comments/:id", /*userValidation,*/ deleteComment);
router.post("/:id/images", /*userValidation,*/ addImage);
router.post("/:id/comments", /*userValidation,*/ addComment);
router.get("/:id/comments", /*userValidation,*/ getComments);
router.post("/:id/rates", /*userValidation,*/ addRate);
router.delete("/:id/rates", /*userValidation,*/ deleteRate);
router.delete("/:id", /*adminValidation,*/ deleteSingleProduct);
router.put("/:id", /*adminValidation,*/ updateSingleProduct);
router.get("/:id", getSingleProduct);
router.post("/", /*adminValidation,*/ addSingleProduct);
router.get("/", getProducts);

module.exports = router;
