import Timer from "./components/timer/timer";
import Prices from "./components/prices/prices";
import "./trading.css";
import { useState } from "react";

// TODO refactor - move to utils
const randomFromRange = (min = 1, max = 10) => {
  return min + Math.random() * (max - min);
};

const Trading = (props) => {
  const initPriceValue = randomFromRange();
  const initDeltaValue = randomFromRange(0.1, 0.2);
  const [currentPare, setCurrentPare] = useState({
    buy: initPriceValue,
    sell: initPriceValue + initDeltaValue,
  });
  const generateNewPrices = () => {
    const priceValue = randomFromRange();
    const deltaValue = randomFromRange(0.1, 0.2);
    setCurrentPare({
      buy: priceValue,
      sell: priceValue + deltaValue,
    });
  };
  return (
    <section className="trading">
      Trading
      <Timer></Timer>
      <select onChange={() => generateNewPrices()}>
        <option value="USD/RUB">USD/RUB</option>
        <option value="RUB/USD">RUB/USD</option>
      </select>
      <Prices buy={currentPare.buy} sell={currentPare.sell}></Prices>
    </section>
  );
};
export default Trading;