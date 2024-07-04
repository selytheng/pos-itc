import PropTypes from "prop-types";

const OrderItemCard = ({ cardInfo, onAdd }) => {
  const { title, price, stock, image } = cardInfo;

  return (
    <div className="order-card">
      <div className="order-card-info">
        <img
          className="order-info-image"
          src={`http://34.123.7.14/${image}`}
          alt={title}
        />
        <h5 className="order-info-title">{title}</h5>
        <div className="order-info-price-container">
          <div className="order-info-price-prefix">$</div>
          <div className="order-info-price">{price}</div>
        </div>
        <div className="order-info-stock-container">
          <p className="order-info-stock">{stock}</p>
          <div>stocks</div>
        </div>
        <button className="order-info-add" onClick={() => onAdd(cardInfo)}>
          ADD
        </button>
      </div>
    </div>
  );
};

OrderItemCard.propTypes = {
  cardInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default OrderItemCard;
