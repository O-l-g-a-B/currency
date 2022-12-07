const ORDERS_STORAGE_KEY = "currency-test-app-storage";
const addOrder = (order, serviceContext) => {
  serviceContext.tmpStorage =
    serviceContext.tmpStorage ||
    JSON.parse(sessionStorage.getItem(ORDERS_STORAGE_KEY) || "[]");
  const orderUniqueKey = createCustomUniqueKey();
  serviceContext.tmpStorage.push({ [orderUniqueKey]: order });

  sessionStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(serviceContext.tmpStorage)
  );
};
const createCustomUniqueKey = () => {
  return `${Date.now().toString()}-${Math.floor(
    Math.random() * 1000
  ).toString()}`;
};
const getAllOrders = () => {
  return Promise.resolve(
    JSON.parse(sessionStorage.getItem(ORDERS_STORAGE_KEY))
  );
};

const orderService = {
  tmpStorage: null,
  addOrder,
  getAllOrders,
};

export default orderService;