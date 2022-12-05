import { SELL_BUY_PART_BIAS } from "../consts/trading-settings";
import randomFromRange from "../utils/randomFromRange";
import ApiService from "./api.service";

const pairHolderMap = new Map();

const getCurrencyPairs = () => {
  return ApiService.getCurrency().then((currencies) => {
    updatePairPrices(currencies);
    return pairHolderMap;
  });
};

const updatePairPrices = (currencies) => {
  for (let i = 0; i < currencies.length; i++) {
    for (let j = 0; j < currencies.length; j++) {
      if (i === j) {
        continue;
      }
      const key = getPairKey(currencies[i].name, currencies[j].name);
      const sell = randomFromRange();
      const buy = sell + sell * SELL_BUY_PART_BIAS;
      pairHolderMap.set(key, { sell, buy });
    }
  }
};

const getPairKey = (currencyName1, currencyName2) => {
  return `${currencyName1}\\${currencyName2}`;
};

const currencyService = {
  getCurrencyPairs,
};

export default currencyService;