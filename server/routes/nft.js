const express = require("express");
const apicache = require("apicache");
const { getNftTransfers } = require("../controllers/nftController");
const router = express.Router();

const cache = apicache.middleware;

router.get("/transfers", cache('10 seconds'), getNftTransfers);

module.exports = router;
