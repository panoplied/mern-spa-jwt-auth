const TransferRecord = ({ erc, title, mint, burn, from, to }) => {

  const txAction = (
    <>
      {mint && (
        <>
          <span className="crtLime">MINT </span>
          <span className="crtCyan">TO {to}</span>
        </>
      )}
      {burn && (
        <>
          <span className="crtRed">BURN </span>
          <span className="crtCyan">BY {from}</span>
        </>
      )}
      {!mint && !burn && (
        <>
          <span className="crtGreen">SALE/TRANSFER </span>
          <span className="crtCyan">FROM {from} TO {to}</span>
        </>
      )}
    </>
  );

  const separator = "  ";

  return (
    <>
      <span className="crtCyan">{erc} NFT: </span>
      <span className="crtAmber">{title} </span>
      {txAction}
      {separator}
    </>
  );
};

export default TransferRecord;
