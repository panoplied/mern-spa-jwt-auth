const ethers = require("ethers");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { ALCHEMY_BASE_URL, ALCHEMY_API_KEY } = process.env;

const alchemy = new ethers.providers.AlchemyProvider(
  "homestead",
  ALCHEMY_API_KEY
);

const getNftTransfers = async (req, res) => {
  const latestBlock = await alchemy.getBlockNumber();
  const manyBlocksAgo = latestBlock - 10;

  const reqBody = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: ethers.utils.hexlify(manyBlocksAgo),
        excludeZeroValue: true,
        category: ["erc721", "erc1155", "specialnft"],
      },
    ],
  });

  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: reqBody,
    redirect: "follow",
  };

  try {
    const nftData = await fetch(
      `${ALCHEMY_BASE_URL}${ALCHEMY_API_KEY}`,
      reqOptions
    );
    const nftJson = await nftData.json();
    const transfers = nftJson.result.transfers;
    res.status(200).json({ transfers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNftTransfers,
};
