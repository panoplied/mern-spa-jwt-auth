import { useEffect, useState, useMemo } from "react";
import TransferRecord from "./TransferRecord";
import API_BASE_URL from "../../../env";

import styles from "./NFTMonitor.module.css";

const NftMonitor = () => {
  const [transfers, setTransfers] = useState([]);
  const [blockNum, setBlockNum] = useState("");
  const TRANSFERS_UPDATE_RATE = 5000;

  const updateTransfers = async () => {
    try {
      const fetchedTransfers = await fetchTransfers();
      const latestBlockNum = fetchedTransfers[0].blockNum;
      if (latestBlockNum != blockNum) {
        console.log(latestBlockNum, blockNum);
        setBlockNum(latestBlockNum, setTransfers(fetchedTransfers));
        // setTransfers(fetchedTransfers);
        console.log("updated");
      }
    } catch (error) {
      // TODO set transfers to dummy JSON data from file
      // or actually maybe better set initial transfers value to that
      // and only show message in this catch block (ignore potential API error?)
      console.log(error.message);
    }
  };

  const fetchTransfers = async () => {
    const response = await fetch(`${API_BASE_URL}/nft/transfers`);
    const { transfers } = await response.json();
    return transfers;
  };

  useEffect(() => {
    updateTransfers();
    const interval = setInterval(() => {
      updateTransfers();
    }, TRANSFERS_UPDATE_RATE);

    return () => clearInterval(interval);
  }, []);



  const ETH_ZERO_ADDR = "0X0000000000000000000000000000000000000000";
  const ETH_DEAD_ADDR = "0X000000000000000000000000000000000000DEAD";

    const formattedTransfers = useMemo(() => transfers
  .filter(t => {
    console.log("RUN")
    return t.asset !== null})
  .map(t => (
    <TransferRecord
      key={t.uniqueId}
      erc={t.category.toUpperCase()}
      title={t.asset}
      mint={t.from.toUpperCase() === ETH_ZERO_ADDR}
      burn={t.to.toUpperCase() === ETH_DEAD_ADDR || t.to.toUpperCase() === ETH_ZERO_ADDR}
      from={t.from.toUpperCase()}
      to={t.to.toUpperCase()}
    />
  )), [transfers]);

  // const formattedTransfers = transfers
  //   .filter(t => {
  //     console.log("RUN")
  //     return t.asset !== null})
  //   .map(t => (
  //     <TransferRecord
  //       key={t.uniqueId}
  //       erc={t.category.toUpperCase()}
  //       title={t.asset}
  //       mint={t.from.toUpperCase() === ETH_ZERO_ADDR}
  //       burn={t.to.toUpperCase() === ETH_DEAD_ADDR || t.to.toUpperCase() === ETH_ZERO_ADDR} 
  //       from={t.from.toUpperCase()}
  //       to={t.to.toUpperCase()}
  //     />
  //   ));

  return (
    <div className={styles.nft_monitor}>
      {formattedTransfers}
    </div>
  );
};

export default NftMonitor;
