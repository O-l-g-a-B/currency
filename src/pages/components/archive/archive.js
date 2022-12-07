import { useEffect, useState } from "react";
import "./arhive.css";
import orderService from "../../../services/order.service";

const Archive = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    orderService.getAllOrders().then((res) => {
      if (mounted) {
        setOrderItems(res);
      }
    });
    return () => (mounted = false);
  }, []);
  return (
    <section className="archive">
      <h2>Archive</h2>
      <table className="archive__table">
        <thead>
          <tr>
            <th>Side</th>
            <th>Price</th>
            <th>Instrument</th>
            <th>Volume</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody className="archive__table-body">
          {orderItems?.map((order) => {
            const valueOrder = Object.values(order) && Object.values(order)[0];
            return (
              <tr key={valueOrder?.timestamp?.toString()}>
                <td
                  className={`archive__cell archive__cell_${valueOrder.side}`}
                >
                  {valueOrder.side}
                </td>
                <td>{valueOrder.price}</td>
                <td>{valueOrder.instrument}</td>
                <td>{valueOrder.volume}</td>
                <td>{new Date(valueOrder.timestamp).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Archive;