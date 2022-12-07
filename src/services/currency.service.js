import { SELL_BUY_PART_BIAS } from "../consts/trading-settings";
import randomFromRange from "../utils/randomFromRange";
import ApiService from "./api.service";

let pairHolderMap = new Map();

const getCurrencyPairs = () => {
  return ApiService.getCurrency().then((currencies) => {
    pairHolderMap = updatePairPrices(currencies, pairHolderMap);
    return pairHolderMap;
  });
};

const updatePairPrices = (currencies, oldPairHolderMap) => {
  const newPairHolderMap = new Map();

  for (let i = 0; i < currencies.length; i++) {
    for (let j = 0; j < currencies.length; j++) {
      if (i === j) {
        continue;
      }

      const key = getPairKey(currencies[i].name, currencies[j].name);
      const connectedKey = getPairKey(currencies[j].name, currencies[i].name);

      if (newPairHolderMap.get(key)) {
        continue;
      }
      let sell = randomFromRange();

      if (oldPairHolderMap.get(key)) {
        const maxValue =
          oldPairHolderMap.get(key).sell +
          oldPairHolderMap.get(key).sell * SELL_BUY_PART_BIAS;
        const minValue =
          oldPairHolderMap.get(key).sell -
          oldPairHolderMap.get(key).sell * SELL_BUY_PART_BIAS;
        sell = randomFromRange(
          minValue > 0 ? minValue : SELL_BUY_PART_BIAS,
          maxValue
        );
      }

      const buy = sell + sell * SELL_BUY_PART_BIAS;
      newPairHolderMap.set(key, { sell, buy, pairName: key });
      newPairHolderMap.set(connectedKey, {
        sell: 1 / sell,
        buy: 1 / sell + (1 / sell) * SELL_BUY_PART_BIAS,
        pairName: connectedKey,
      });
    }
  }

  return newPairHolderMap;
};

const getPairKey = (currencyName1, currencyName2) => {
  return `${currencyName1}\\${currencyName2}`;
};

const currencyService = {
  getCurrencyPairs,
};

export default currencyService;