import { useState, useEffect, useRef } from "react";
import ProductItemCard from "./ProductItem";
import "./ProductItems.scss";
import PropTypes from "prop-types";
import { MdAdd, MdCancel } from "react-icons/md";

const ProductItemCards = ({ selectedCategoryId }) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category_id: "",
    unit_price: "",
    promotion: "",
    quantity: "",
    alert: "",
    image: null,
    code: "",
  });
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://34.123.7.14/api/categories/${selectedCategoryId}/products`,
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
        const mappedItems = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.unit_price,
          stock: item.quantity,
          image: item.image,
        }));
        setItems(mappedItems);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://34.123.7.14/api/categories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [selectedCategoryId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
    // Image preview
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category_id", newProduct.category_id);
    formData.append("unit_price", newProduct.unit_price);
    formData.append("promotion", newProduct.promotion);
    formData.append("quantity", newProduct.quantity);
    formData.append("alert", newProduct.alert);
    formData.append("image", newProduct.image);
    formData.append("code", newProduct.code);

    try {
      const response = await fetch(`http://34.123.7.14/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
      }

      const addedProduct = await response.json();
      setItems([...items, addedProduct]);
      setShowForm(false);
      setNewProduct({
        name: "",
        category_id: "",
        unit_price: "",
        promotion: "",
        quantity: "",
        alert: "",
        image: null,
        code: "",
      });
      console.log("Add Success");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const [preview, setPreview] = useState(null);

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
        </div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <ProductItemCard key={index} cardInfo={item} />
          ))
        ) : (
          <div className="no-products-message">No products available</div>
        )}
      </div>

      {showForm && (
        <div className="product-form-dialog">
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category_id"
                value={newProduct.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Unit Price:</label>
              <input
                type="text"
                name="unit_price"
                value={newProduct.unit_price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Promotion:</label>
              <input
                type="text"
                name="promotion"
                value={newProduct.promotion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Alert:</label>
              <input
                type="text"
                name="alert"
                value={newProduct.alert}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Product Preview"
                  className="image-preview"
                />
              )}
            </div>
            <div className="form-group">
              <label>Code:</label>
              <input
                type="text"
                name="code"
                value={newProduct.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Add Product</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

ProductItemCards.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
};

export default ProductItemCards;
