const express = require("express");
const router = express.Router();

const apicache = require("apicache");
const cache = apicache.middleware;

const { getNftTransfers } = require("../controllers/nftController");
router.get("/transfers", cache('10 seconds'), getNftTransfers);

module.exports = router;
