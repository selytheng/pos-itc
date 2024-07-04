import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const PaymentContext = createContext({});

export const PaymentProvider = ({ children }) => {
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Close the payment container by default when the screen width is less than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPaymentOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Check initial window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openPayment = () => {
    setPaymentOpen(true);
  };

  const closePayment = () => {
    setPaymentOpen(false);
  };

  const addItemToOrder = (newItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.code === newItem.code);
      if (existingItem) {
        return prevItems.map((item) =>
          item.code === newItem.code
            ? { ...item, qty: item.qty + 1, instructions: newItem.instructions }
            : item
        );
      }
      return [...prevItems, { ...newItem, qty: 1 }];
    });
  };

  const removeItemFromOrder = (productCode) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.code !== productCode)
    );
  };

  const updateItemQuantity = (productCode, newQty) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.code === productCode ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <PaymentContext.Provider
      value={{
        isPaymentOpen,
        openPayment,
        closePayment,
        items,
        addItemToOrder,
        removeItemFromOrder,
        updateItemQuantity,
        clearCart, // Provide the clearCart function
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
