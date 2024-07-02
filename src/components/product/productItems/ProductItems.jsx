import { useState, useEffect, useRef } from "react";
import ProductItemCard from "./ProductItem";
import "./ProductItems.scss";
import PropTypes from "prop-types";
import { MdAdd, MdCancel } from "react-icons/md";

const ProductItemCards = ({ selectedCategoryId }) => {
  // Change prop name to selectedCategoryId
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
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMzQuMTIzLjcuMTQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTk4NzUzMDksImV4cCI6MTcxOTg3ODkwOSwibmJmIjoxNzE5ODc1MzA5LCJqdGkiOiJNcWp0ejdPZHp2VGxlNmN2Iiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJlbWFpbCI6Imx5aGFiQGdtYWlsLmNvbSIsIm5hbWUiOiJMeWhhYiJ9.qyYkL844Y82I4d9HBJwqdoO0GfEcD9VAMSTH4oj266g";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://34.123.7.14/api/categories/${selectedCategoryId}/products`, // Fetch based on category ID
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        // Map API response to match the ProductItemCard expected fields
        const mappedItems = data.map((item) => ({
          title: item.name,
          price: item.unit_price,
          stock: item.quantity,
          image: item.image,
        }));
        setItems(mappedItems);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchProducts();
  }, [selectedCategoryId]); // Fetch products whenever selectedCategoryId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

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

  const handleCancelImage = () => {
    setNewProduct({ ...newProduct, image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddProduct = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      // Assuming newProduct has the correct structure
      setItems([
        ...items,
        {
          title: newProduct.title,
          price: newProduct.price,
          stock: newProduct.stock,
          image: newProduct.image,
        },
      ]);
      setShowForm(false);
      setIsFadingOut(false);
      setNewProduct({ image: null, title: "", price: "", stock: "" });
    }, 500);
  };

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
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newProduct.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button className="add-button" onClick={handleAddProduct}>
                  Add Product
                </button>
                <button className="cancel-button" onClick={handleCancelAdd}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <ProductItemCard key={index} cardInfo={item} />
          ))
        ) : (
          <div className="no-products-message">No products available</div>
        )}
      </div>
    </section>
  );
};

ProductItemCards.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired, // Update prop types for category ID
};

export default ProductItemCards;
