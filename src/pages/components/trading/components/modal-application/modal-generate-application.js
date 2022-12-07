import "./modal-generate-application.css";
import formatPrice from "../../../../../utils/formatePrice";
import { useState, useRef } from "react";
import orderService from "../../../../../services/order.service";

const ModalGenerateApplication = (props) => {
  const [infoMessage, setInfoMassage] = useState({ value: "", type: "" });

  const volumeInputRef = useRef(null);

  if (!props?.modalState?.show) {
    return null;
  }
  const actionType = props.modalState?.actionType?.toLowerCase();
  const pairName = props.modalState?.currencySelectedPare?.pairName;
  const price = formatPrice(props.modalState?.currencySelectedPare[actionType]);

  const addOrder = () => {
    const volumeValue = volumeInputRef?.current?.value;
    if (!volumeValue || isNaN(Number(volumeValue))) {
      setInfoMassage({ value: "wrong or empty volume", type: "error" });
      return;
    }

    const timestamp = new Date();

    orderService.addOrder(
      {
        side: actionType,
        timestamp,
        instrument: pairName,
        price: price,
        volume: volumeValue,
      },
      orderService
    );
    setInfoMassage({
      value: `success: (${timestamp.toLocaleString()}):${volumeValue}`,
      type: "success",
    });
    volumeInputRef.current.value = "";
  };
  return (
    <div className="modal-background">
      <div className="modal">
        <h2 className="modal__title">Make Order</h2>
        <section className="modal__info">
          <span>{pairName}</span>
          <span className={`modal-info__item modal-info__item_${actionType}`}>
            {actionType}
          </span>
          <span>{price}</span>
        </section>
        <div className="modal__action">
          <label htmlFor="volume">Volum</label>
          <input id="volume" ref={volumeInputRef}></input>
          <div className="modal__controls">
            <button onClick={addOrder}>Okey</button>
            <button onClick={props.onClose}>Cancel</button>
          </div>
        </div>
        {infoMessage.value && (
          <div className={`modal__alert modal__alert_${infoMessage.type}`}>
            {infoMessage.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalGenerateApplication;