import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ProductItemCard = ({ cardInfo }) => {
  const { id, name, price, stock, image: initialImage, category_id } = cardInfo;
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category_id: "",
    unit_price: "",
    quantity: "",
    image: null,
    promotion: "",
    alert: "",
    code: "",
    _method: "PATCH",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const accessToken = localStorage.getItem("access_token");

  const handleEditClick = () => {
    setEditedProduct({
      name,
      category_id: "",
      unit_price: price,
      quantity: stock,
      image: initialImage,
      promotion: "", // Update these values as needed
      alert: "",
      code: "",
      _method: "PATCH",
    });
    setShowEditDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProduct((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editedProduct.name);
    formData.append("category_id", editedProduct.category_id);
    formData.append("unit_price", editedProduct.unit_price);
    formData.append("quantity", editedProduct.quantity);
    formData.append("promotion", editedProduct.promotion);
    formData.append("alert", editedProduct.alert);
    formData.append("image", editedProduct.image);
    formData.append("code", editedProduct.code);
    formData.append("_method", "PATCH");

    const response = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      // handle successful update (e.g., close dialog, show success message)
      setShowEditDialog(false);
      console.log("update successfully");
      window.location.href = "/products";
    } else {
      // handle error
      console.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("delete sucessfully");
      window.location.href = "/products";

      if (response.ok) {
        // handle successful deletion (e.g., navigate away, show message)
      } else {
        // handle deletion error
        console.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-info">
        <img
          className="product-info-image"
          src={imagePreview || `http://localhost:8000/${initialImage}`}
          alt={name}
        />
        <h5 className="product-info-title">{name}</h5>
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
        <div className="product-info-actions">
          <button className="product-info-edit" onClick={handleEditClick}>
            <MdEdit size={25} /> Edit Product
          </button>
          <button className="product-info-delete" onClick={handleDeleteProduct}>
            <MdDelete size={25} /> Delete Product
          </button>
        </div>
      </div>

      {showEditDialog && (
        <div className="product-form-dialog">
          <form onSubmit={handleFormSubmit} className="product-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                name="category_id"
                value={editedProduct.category_id}
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
                value={editedProduct.unit_price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={editedProduct.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <img
                  className="product-image-preview"
                  src={imagePreview}
                  alt="Preview"
                />
              )}
            </div>
            <div className="form-group">
              <label>Promotion:</label>
              <input
                type="text"
                name="promotion"
                value={editedProduct.promotion}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Alert:</label>
              <input
                type="text"
                name="alert"
                value={editedProduct.alert}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Code:</label>
              <input
                type="text"
                name="code"
                value={editedProduct.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowEditDialog(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

ProductItemCard.propTypes = {
  cardInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    category_id: PropTypes.number,
  }).isRequired,
};

export default ProductItemCard;
