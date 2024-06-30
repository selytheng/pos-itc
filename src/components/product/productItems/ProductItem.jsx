import PropTypes from "prop-types";
import { MdEdit } from "react-icons/md";

const ProductItemCard = ({ cardInfo }) => {
  const { title, price, stock, image } = cardInfo;

  return (
    <div className="product-card">
      <div className="product-card-info">
        <img className="product-info-image" src={image} />
        <h5 className="product-info-title">{title}</h5>
        <div className="product-info-price-stock">
          <div className="product-info-price-container">
            <div className="product-info-price-prefix">$</div>
            <div className="product-info-price">{price}</div>
          </div>
          <div className="product-info-stock-container">
            <p className="product-info-stock">{stock}</p>
            <div className="product-info-stock-suffix">stocks</div>
          </div>
        </div>
        <button className="product-info-edit">
          <MdEdit size={25} /> Edit Product
        </button>
      </div>
    </div>
  );
};

export default ProductItemCard;

ProductItemCard.propTypes = {
  cardInfo: PropTypes.object.isRequired,
};
