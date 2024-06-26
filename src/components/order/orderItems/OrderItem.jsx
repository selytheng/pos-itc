import PropTypes from "prop-types";

const OrderItemCard = ({ cardInfo }) => {
  const { title, value, stock, image } = cardInfo;

  return (
    <div className="order-card">
      <div className="order-card-info">
        <img className="info-image" src={image} />
        <h5 className="info-title">{title}</h5>
        <div className="info-value">{value}</div>
        <p className="info-stock">{stock}</p>
      </div>
    </div>
  );
};

export default OrderItemCard;

OrderItemCard.propTypes = {
  cardInfo: PropTypes.object.isRequired,
};
