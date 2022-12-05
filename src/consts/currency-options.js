import randomFromRange from "../utils/randomFromRange";

const CURRENCY = [
  { name: "EUR", price: randomFromRange() },
  { name: "USD", price: randomFromRange() },
  { name: "RUB", price: randomFromRange() },
];

export default CURRENCY;