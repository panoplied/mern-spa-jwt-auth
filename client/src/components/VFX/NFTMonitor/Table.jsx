import Record from "./Record";
import styles from "./Table.module.css";

const ETH_ZERO_ADDR = "0X0000000000000000000000000000000000000000";
const ETH_DEAD_ADDR = "0X000000000000000000000000000000000000DEAD";

const Table = ({ transfers }) => {
  const transferStyles = {
    erc: "crtCyan",
    title: "crtAmber",
    mint: "crtLime",
    burn: "crtRed",
    saleTransfer: "crtGreen",
    from: "crtCyan",
    to: "crtCyan",
  };

  const formattedTransfers = transfers
    .filter((t) => t.asset !== null)
    .reverse()
    .map((t) => (
      <Record
        key={t.uniqueId}
        txnData={{
          erc: t.category.toUpperCase(),
          title: t.asset,
          mint: t.from.toUpperCase() === ETH_ZERO_ADDR,
          burn:
            t.to.toUpperCase() === ETH_DEAD_ADDR ||
            t.to.toUpperCase() === ETH_ZERO_ADDR,
          from: t.from.toUpperCase(),
          to: t.to.toUpperCase(),
        }}
        styles={transferStyles}
        separator={"  "}
      />
    ));

  return <div className={styles.nftTable}>{formattedTransfers}</div>;
};

export default Table;
