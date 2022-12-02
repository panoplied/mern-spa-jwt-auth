import { useEffect, useState } from "react";
import TransferRecord from "./TransferRecord";
import API_BASE_URL from "../../env";

const NftMonitor = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const updateTransfers = async () => {
      try {
        const fetchedTransfers = await fetchTransfers();
        setTransfers(fetchedTransfers);
      } catch (error) {
        // TODO set transfers to dummy JSON data from file
        // or actually maybe better set initial transfers value to that
        // and only show message in this catch block (ignore potential API error?)
        console.log(error.message);
      }
    };
    updateTransfers();

    const interval = setInterval(() => {
      updateTransfers();
    }, 5000);

    return () => clearInterval(interval);
  }, [transfers]);

  const fetchTransfers = async () => {
    const response = await fetch(`${API_BASE_URL}/nft/transfers`);
    const { transfers } = await response.json();
    return transfers;
  };

  const ETH_ZERO_ADDR = "0x0000000000000000000000000000000000000000";
  const ETH_DEAD_ADDR = "0x000000000000000000000000000000000000dEaD";

  const formattedTransfers = transfers
    .filter(t => t.asset !== null)
    .map(t => (
      <TransferRecord
        key={t.uniqueId}
        erc={t.category.toUpperCase()}
        title={t.asset}
        mint={t.from === ETH_ZERO_ADDR}
        burn={t.to === ETH_ZERO_ADDR || t.to === ETH_DEAD_ADDR}
        from={t.from.toUpperCase()}
        to={t.to.toUpperCase()}
      />
    ));

  console.log(formattedTransfers);

  return <>{formattedTransfers}</>;
};

export default NftMonitor;
