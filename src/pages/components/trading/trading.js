import Timer from "./components/timer/timer";
import Prices from "./components/prices/prices";
import "./trading.css";
import { useEffect, useState } from "react";
import currencyService from "../../../services/currency.service";
import randomFromRange from "../../../utils/randomFromRange";
import ModalGenerateApplication from "./components/modal-application/modal-generate-application";

const Trading = (props) => {
  const [currencySelectedPare, setCurrencySelectedPare] = useState({
    sell: null,
    buy: null,
    pairName: null,
  });

  const [currencyPairsMap, setCurrencyPairsMap] = useState(new Map());

  const [modalState, setModalState] = useState({
    show: false,
    actionType: null,
    currencySelectedPare: null,
  });

  const onPriceClickHandler = (actionType) => {
    setModalState({ show: true, actionType, currencySelectedPare });
  };

  const handleChanges = (e) => {
    const key = e.target.value;
    const selected = currencyPairsMap.get(key);
    setCurrencySelectedPare({
      sell: selected.sell,
      buy: selected.buy,
      pairName: selected.pairName,
    });
  };

  useEffect(() => {
    let mounted = true;

    currencyService.getCurrencyPairs().then((currencyPairsMapResponse) => {
      if (mounted) {
        setCurrencyPairsMap(currencyPairsMapResponse);

        const [firstCurrencyPairValue] = currencyPairsMapResponse?.values();

        setCurrencySelectedPare({
          sell: firstCurrencyPairValue?.sell,
          buy: firstCurrencyPairValue?.buy,
          pairName: firstCurrencyPairValue?.pairName,
        });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let timeOutValue = randomFromRange(1000, 3000);
    const timeoutId = setTimeout(() => {
      currencyService.getCurrencyPairs().then((currencyPairsMapResponse) => {
        if (mounted && !modalState.show) {
          setCurrencyPairsMap(currencyPairsMapResponse);

          const selectedPair = currencyPairsMapResponse?.get(
            currencySelectedPare?.pairName
          );

          setCurrencySelectedPare({
            sell: selectedPair?.sell,
            buy: selectedPair?.buy,
            pairName: selectedPair?.pairName,
          });
        }
      });
    }, timeOutValue);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [currencyPairsMap, currencySelectedPare.pairName, modalState.show]);

  return (
    <section className="trading">
      Trading
      <Timer></Timer>
      <select onChange={handleChanges}>
        {Array.from(currencyPairsMap?.values())?.map((currencyPairItem) => {
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
        onClick={(actionType) => onPriceClickHandler(actionType)}
        buy={currencySelectedPare.buy}
        sell={currencySelectedPare.sell}
        pairName={currencySelectedPare.pairName}
      ></Prices>
      <ModalGenerateApplication
        onClose={() => setModalState({ show: false })}
        modalState={modalState}
      ></ModalGenerateApplication>
    </section>
  );
};
export default Trading;