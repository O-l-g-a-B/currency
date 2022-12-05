import Timer from "./components/timer/timer";
import Prices from "./components/prices/prices";
import "./trading.css";
import { useEffect, useState } from "react";
import currencyService from "../../../services/currency.service";

const Trading = (props) => {
  const [currencySelectedPare, setCurrencySelectedPare] = useState({
    sell: null,
    buy: null,
  });

  const [currencyPairsMap, setCurrencyPairsMap] = useState();

  const [currencyPairs, setCurrencyPairs] = useState([]);

  const handleChanges = (e) => {
    const key = e.target.value;
    const selected = currencyPairsMap.get(key);
    setCurrencySelectedPare({ sell: selected.sell, buy: selected.buy });
  };

  useEffect(() => {
    let mounted = true;
    currencyService.getCurrencyPairs().then((currencyPairs) => {
      if (mounted) {
        const tmpArr = [];
        Array.from(currencyPairs.keys()).forEach((key) => {
          const currencyValue = currencyPairs.get(key);
          tmpArr.push({
            pairName: key,
            sell: currencyValue.sell,
            buy: currencyValue.buy,
          });
        });
        setCurrencyPairsMap(currencyPairs);
        setCurrencyPairs(tmpArr);
        setCurrencySelectedPare({ sell: tmpArr[0].sell, buy: tmpArr[0].buy });
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <section className="trading">
      Trading
      <Timer></Timer>
      <select onChange={handleChanges}>
        {currencyPairs.map((currencyPairItem) => {
          return (
            <option
              value={currencyPairItem.pairName}
              key={currencyPairItem.pairName}
            >
              {currencyPairItem.pairName}
            </option>
          );
        })}
      </select>
      <Prices
        buy={currencySelectedPare.buy}
        sell={currencySelectedPare.sell}
      ></Prices>
    </section>
  );
};
export default Trading;