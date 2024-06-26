// PaymentContext.jsx
import { createContext, useState, useEffect } from "react";
import { PropTypes } from "prop-types";

export const PaymentContext = createContext({});

export const PaymentProvider = ({ children }) => {
  const [isPaymentOpen, setPaymentOpen] = useState(false);

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

  return (
    <PaymentContext.Provider
      value={{
        isPaymentOpen,
        openPayment,
        closePayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

PaymentProvider.propTypes = {
  children: PropTypes.node,
};
