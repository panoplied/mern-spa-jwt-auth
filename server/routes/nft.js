const express = require("express");
const { getNftTransfers } = require("../controllers/nftController");
const router = express.Router();

router.get("/transfers", getNftTransfers);

module.exports = router;
