const Record = ({ txnData, styles, separator }) => {
  const { erc, title, mint, burn, from, to } = txnData;

  const txn = (
    <>
      {mint && (
        <>
          <span className={styles.mint}>MINT </span>
          <span className={styles.to}>TO {to}</span>
        </>
      )}
      {burn && (
        <>
          <span className={styles.burn}>BURN </span>
          <span className={styles.from}>BY {from}</span>
        </>
      )}
      {!mint && !burn && (
        <>
          <span className={styles.saleTransfer}>SALE/TRANSFER </span>
          <span className={styles.from}>FROM {from} </span>
          <span className={styles.to}>TO {to} </span>
        </>
      )}
    </>
  );

  return (
    <>
      <span className={styles.erc}>{erc} NFT: </span>
      <span className={styles.title}>{title} </span>
      {txn}
      {separator}
    </>
  );
};

export default Record;
