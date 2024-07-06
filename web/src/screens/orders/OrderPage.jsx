// import { useState, useEffect } from "react";
// import {
//   OrderTop,
//   OrderMenu,
//   OrderItems,
//   OrderPayment,
// } from "../../components";
// import { PaymentProvider } from "../../context/PaymentContext";
// import "./OrderPage.scss";

// const OrderPage = () => {
//   const [selectedMenu, setSelectedMenu] = useState(""); // Add state for menu selection
//   const [categories, setCategories] = useState([]); // Add state for category name
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add state for category ID
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/categories", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             `HTTP error! Status: ${response.status} - ${response.statusText}`
//           );
//         }

//         const data = await response.json();
//         setCategories(data);
//         if (data.length > 0) {
//           setSelectedMenu(data[0].name); // Default to the first category
//           setSelectedCategoryId(data[0].id); // Set the ID for the first category
//         }
//       } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSelectMenu = (menu, id) => {
//     setSelectedMenu(menu);
//     setSelectedCategoryId(id); // Update the selected category ID
//   };

//   return (
//     <PaymentProvider>
//       <div className="content-area">
//         <OrderTop />
//         <OrderMenu
//           selectedMenu={selectedMenu}
//           onSelectMenu={handleSelectMenu} // Pass the handleSelectMenu function here
//           categories={categories}
//         />
//         <div className="order-area">
//           <div className="item-area">
//             {selectedCategoryId && (
//               <OrderItems selectedCategoryId={selectedCategoryId} />
//             )}{" "}
//             {/* Pass the category ID to OrderItems */}
//           </div>
//           <div className="payment-area">
//             <OrderPayment />
//           </div>
//         </div>
//       </div>
//     </PaymentProvider>
//   );
// };

// export default OrderPage;

import { useState, useEffect } from "react";
import {
  OrderTop,
  OrderMenu,
  OrderItems,
  OrderPayment,
} from "../../components";
import { PaymentProvider } from "../../context/PaymentContext";
import "./OrderPage.scss";

const OrderPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(""); // Add state for menu selection
  const [categories, setCategories] = useState([]); // Add state for category name
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Add state for category ID
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories", {
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
          const savedCategoryId = localStorage.getItem("selectedCategoryId");
          const initialCategoryId = savedCategoryId
            ? parseInt(savedCategoryId)
            : data[0].id;
          const initialMenu =
            data.find((category) => category.id === initialCategoryId)?.name ||
            data[0].name;
          setSelectedMenu(initialMenu); // Default to the saved or first category
          setSelectedCategoryId(initialCategoryId); // Set the ID for the selected or first category
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
    localStorage.setItem("selectedCategoryId", id); // Save the selected category ID to localStorage
  };

  return (
    <PaymentProvider>
      <div className="content-area">
        <OrderTop />
        <OrderMenu
          selectedMenu={selectedMenu}
          onSelectMenu={handleSelectMenu} // Pass the handleSelectMenu function here
          categories={categories}
        />
        <div className="order-area">
          <div className="item-area">
            {selectedCategoryId && (
              <OrderItems selectedCategoryId={selectedCategoryId} />
            )}{" "}
            {/* Pass the category ID to OrderItems */}
          </div>
          <div className="payment-area">
            <OrderPayment />
          </div>
        </div>
      </div>
    </PaymentProvider>
  );
};

export default OrderPage;
