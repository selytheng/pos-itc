import PropTypes from "prop-types";

const OrderItemCard = ({ cardInfo }) => {
  const { title, value, stock, image } = cardInfo;

  return (
    <div className="order-card">
      <div className="order-card-info">
        <img className="order-info-image" src={image} />
        <h5 className="order-info-title">{title}</h5>
        <div className="order-info-value">{value}</div>
        <p className="order-info-stock">{stock}</p>
        <button className="order-info-add">ADD</button>
      </div>
    </div>
  );
};

export default OrderItemCard;

OrderItemCard.propTypes = {
  cardInfo: PropTypes.object.isRequired,
};
