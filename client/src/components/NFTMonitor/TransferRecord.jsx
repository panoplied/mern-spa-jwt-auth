const TransferRecord = ({ erc, title, mint, burn, from, to }) => {
  return (
    <p>
      {erc} {title} {mint ? "MINT" : ""} {burn? "BURN" : ""} {from} {to}
    </p>
  );
};

export default TransferRecord;
