import { ProductItems, ProductMenu, ProductTop } from "../../components";
import { useState, useEffect } from "react";

const ProductPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(""); // Add state for menu selection
  const [categories, setCategories] = useState([]); // Add state for category name
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add state for category ID
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMzQuMTIzLjcuMTQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTk4NDQzNjYsImV4cCI6MTcxOTg0Nzk2NiwibmJmIjoxNzE5ODQ0MzY2LCJqdGkiOiJMWG03enhydDhMdmZxWnNSIiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJlbWFpbCI6Imx5aGFiQGdtYWlsLmNvbSIsIm5hbWUiOiJMeWhhYiJ9.Glq_PVOQNuP90DaC_OoBRfdhLMpdaplTgvxHFJkHEsY";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://34.123.7.14/api/categories", {
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
