import { useState, useEffect, useCallback } from "react";
import Table from "./Table";

import dummyData from "./dummy_data.json";
import API_BASE_URL from "../../../env";

const UPDATE_RATE = 10000;

const NFTMonitor = () => {
  const [transfers, setTransfers] = useState([]);
  const [blockNum, setBlockNum] = useState("");

  useEffect(() => {
    setTransfers(dummyData.transfers);
  }, []);

  const fetchTransfers = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/nft/transfers`);
    const { transfers } = await response.json();
    return transfers;
  }, []);

  const updateTransfers = useCallback(async () => {
    try {
      const newTransfers = await fetchTransfers();
      const lastBlockNum = newTransfers[newTransfers.length - 1].blockNum;
      if (blockNum !== lastBlockNum) {
        setBlockNum(lastBlockNum, setTransfers(newTransfers));
      }
    } catch (error) {
      console.log(error);
    }
  }, [blockNum, fetchTransfers]);

  useEffect(() => {
    updateTransfers();
    const interval = setInterval(() => {
      updateTransfers();
    }, UPDATE_RATE);

    return () => {
      clearInterval(interval);
    };
  }, [updateTransfers]);

  return <Table transfers={transfers} />;
};

export default NFTMonitor;
