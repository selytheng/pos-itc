import { ProductItems, ProductMenu, ProductTop } from "../../components";
import { useState } from "react";

const Product = () => {
  const [selectedMenu, setSelectedMenu] = useState("Foods");
  return (
    <div className="content-area">
      <ProductTop />
      <ProductMenu onSelectMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      <div className="item-area">
        <ProductItems selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Product;
