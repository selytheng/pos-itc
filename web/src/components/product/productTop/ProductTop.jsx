import { MdOutlineMenu } from "react-icons/md";
import "./ProductTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";

const ProductTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="content-product-top">
      <div className="product-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="product-top-title">Product Management</h2>
      </div>
      <div className="product-top-r">
        <div
          ref={dateRangeRef}
          className={`date-range-wrapper ${
            !showDatePicker ? "hide-date-range" : ""
          }`}
          onClick={handleInputClick}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showMonthAndYearPickers={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductTop;
