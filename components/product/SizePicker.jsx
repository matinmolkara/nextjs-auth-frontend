"use client";
import React, { useState } from "react";

const SizePicker = ({ sizes = [], onSizeSelect }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    if (onSizeSelect) {
      onSizeSelect(size); // ارسال سایز انتخاب‌شده به والد
    }
  };

  return (
    <div className="category-filter-section-1">
      <select
        className="form-select form-select-sm"
        aria-label="انتخاب سایز"
        value={selectedSize}
        onChange={handleSizeChange}
      >
        <option value="" disabled>
          انتخاب کنید
        </option>
        {sizes.map((item) => (
          <option key={item.id} value={item.size}>
            {item.size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SizePicker;
