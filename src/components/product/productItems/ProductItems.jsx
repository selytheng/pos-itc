import { useState, useEffect, useRef } from "react";
import ProductItemCard from "./ProductItem";
import "./ProductItems.scss";
import SaladImage from "../../../assets/images/salad.png";
import PropTypes from "prop-types";
import { MdAdd, MdCancel } from "react-icons/md";

const foodsData = [
  {
    image: SaladImage,
    title: "Hamburger",
    price: "2.99",
    stock: "20",
  },
  {
    image: SaladImage,
    title: "Sandwich",
    price: "2.99",
    stock: "20",
  },
  {
    image: SaladImage,
    title: "Pizza",
    price: "2.99",
    stock: "20",
  },
  {
    image: SaladImage,
    title: "Rice",
    price: "2.99",
    stock: "20",
  },
];

const fruitsData = [
  {
    image: SaladImage,
    title: "Apple",
    price: "2.99",
    stock: "20",
  },
  {
    image: SaladImage,
    title: "Banana",
    price: "2.99",
    stock: "20",
  },
  {
    image: SaladImage,
    title: "Orange",
    price: "2.99",
    stock: "20",
  },
];

const ProductItemCards = ({ selectedMenu }) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: null,
    title: "",
    price: "",
    stock: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    switch (selectedMenu) {
      case "Foods":
        setItems(foodsData);
        break;
      case "Fruits":
        setItems(fruitsData);
        break;
      default:
        setItems(foodsData);
    }
  }, [selectedMenu]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProduct({ ...newProduct, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle the 'X' button for cancel the image
  const handleCancelImage = () => {
    setNewProduct({ ...newProduct, image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setItems([...items, newProduct]);
      setShowForm(false);
      setIsFadingOut(false);
      setNewProduct({ image: null, title: "", price: "", stock: "" });
    }, 500);
  };

  // Handle canceling adding new product
  const handleCancelAdd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowForm(false);
      setIsFadingOut(false);
      setNewProduct({ image: null, title: "", price: "", stock: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 500);
  };

  return (
    <section className="content-product-container">
      <div className="content-product-cards">
        <div className="add-new-product-function">
          <div
            className="add-new-product-container"
            onClick={() => setShowForm(true)}
          >
            <div>
              <MdAdd size={30} />
            </div>
            <div>ADD NEW PRODUCT</div>
          </div>
          {showForm && (
            <div
              className={`new-product-form ${
                isFadingOut ? "fade-out" : "fade-in"
              }`}
            >
              <div className="form-group">
                <div className="image-input-container">
                  <input
                    type="file"
                    id="product-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  <label
                    htmlFor="product-image"
                    className="custom-file-upload"
                    style={{ display: newProduct.image ? "none" : "block" }}
                  >
                    Choose Image
                  </label>
                  {newProduct.image && (
                    <div className="image-preview">
                      <img src={newProduct.image} alt="Preview" />
                      <button
                        className="cancel-image"
                        onClick={handleCancelImage}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="product-title-container">
                <div className="form-group">
                  <textarea
                    id="product-title"
                    name="title"
                    placeholder="Name"
                    value={newProduct.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="product-price-stock-container">
                <div className="product-price-container">
                  <div className="product-price-prefix">$</div>
                  <div className="input-wrapper">
                    <input
                      id="product-price"
                      name="price"
                      placeholder="Price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="product-stock-container">
                  <div className="input-wrapper">
                    <input
                      id="product-stock"
                      name="stock"
                      placeholder="Stock"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="product-stock-suffix">stocks</div>
                </div>
              </div>

              <div className="add-cancel-product">
                <button
                  className="add-cancel-product-button"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>
                <button
                  className="add-cancel-product-button"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </div>
            </div>
          )}
        </div>

        {items.map((item, index) => (
          <ProductItemCard key={index} cardInfo={item} />
        ))}
      </div>
    </section>
  );
};

ProductItemCards.propTypes = {
  selectedMenu: PropTypes.string.isRequired,
};

export default ProductItemCards;
