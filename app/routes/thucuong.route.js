const express = require('express');
const thucuong = require("../controllers/thucuong.controller");

const router = express.Router();

router.route("/")
    .get(thucuong.findAllthucuong)
    .post(thucuong.createthucuong)
    .delete(thucuong.deleteAllthucuong)
    .put(thucuong.updatethucuong);
module.exports = router;