import styles from "./TransferRecord.module.css";

const TransferRecord = ({ erc, title, mint, burn, from, to }) => {

  const txAction = (
    <>
      {mint && (
        <>
          <span className={styles.lime}>MINT </span>
          <span className={styles.cyan}>TO {to}</span>
        </>
      )}
      {burn && (
        <>
          <span className={styles.red}>BURN </span>
          <span className={styles.cyan}>BY {from}</span>
        </>
      )}
      {!mint && !burn && (
        <>
          <span className={styles.green}>SALE/TRANSFER </span>
          <span className={styles.cyan}>FROM {from} TO {to}</span>
        </>
      )}
    </>
  );

  const separator = <span className={styles.white}>  </span>

  return (
    <>
      <span className={styles.cyan}>{erc} NFT: </span>
      <span className={styles.amber}>{title} </span>
      {txAction}
      {separator}
    </>
  );
};

export default TransferRecord;
