import { ProductItems, ProductMenu, ProductTop } from "../../components";
import { useState, useEffect } from "react";

const ProductPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(""); // Add state for menu selection
  const [categories, setCategories] = useState([]); // Add state for category name
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add state for category ID
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://pos-api.gic-itc.top/api/categories",
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
        setCategories(data);
        if (data.length > 0) {
          setSelectedMenu(data[0].name); // Default to the first category
          setSelectedCategoryId(data[0].id); // Set the ID for the first category
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelectMenu = (menu, id) => {
    setSelectedMenu(menu);
    setSelectedCategoryId(id); // Update the selected category ID
  };

  return (
    <div>
      <ProductTop />
      <ProductMenu
        selectedMenu={selectedMenu}
        onSelectMenu={handleSelectMenu} // Pass the handleSelectMenu function here
        categories={categories}
      />
      {selectedCategoryId && (
        <ProductItems selectedCategoryId={selectedCategoryId} />
      )}{" "}
      {/* Pass the category ID to ProductItems */}
    </div>
  );
};

export default ProductPage;
