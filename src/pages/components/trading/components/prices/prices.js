import "./prices.css";
import formatPrice from "../../../../../utils/formatePrice";

import TRADING_ACTIONS from "../../../../../consts/actions-trading-types";
const Prices = (props) => {
  return (
    <div className="prices">
      <div
        className="prices__item"
        onClick={() => props.onClick(TRADING_ACTIONS.buy)}
      >
        <span>{TRADING_ACTIONS.buy}</span>
        <span>{formatPrice(props.buy)}</span>
      </div>
      <div
        className="prices__item prices__item_buy"
        onClick={() => props.onClick(TRADING_ACTIONS.sell)}
      >
        <span>SELL</span>
        <span>{formatPrice(props.sell)}</span>
      </div>
    </div>
  );
};

export default Prices;