import "./prices.css";
const Prices = (props) => {
  return (
    <div className="prices">
      <div className="prices__item">
        <span>BUY</span>
        <span>{props.buy.toFixed(4)}</span>
      </div>
      <div className="prices__item prices__item_buy">
        <span>SELL</span>
        <span>{props.sell.toFixed(4)}</span>
      </div>
    </div>
  );
};

export default Prices;