import CURRENCY from "../consts/currency-options";

const getCurrency = () => {
  // TODO add backend request
  return Promise.resolve(CURRENCY);
};

const ApiService = {
  getCurrency,
};

export default ApiService;