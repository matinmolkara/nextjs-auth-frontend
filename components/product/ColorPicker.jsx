"use client"
import React, { useState } from "react";

const ColorPicker = ({ colors = [], onColorSelect }) => {
     const [selectedColor, setSelectedColor] = useState(null);
 const handleColorSelect = (color) => {
   setSelectedColor(color);
   if (onColorSelect) {
     onColorSelect(color); // ارسال رنگ انتخاب‌شده به والد
   }
 };
  return (
    <div className="color-filter">
      {colors.map((color, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`color${index}`}
            name="color"
            className="color-radio"
            checked={selectedColor?.name === color.name}
            onChange={() => handleColorSelect(color)}
          />
          <label
            htmlFor={`color${index}`}
            className="color-circle"
            style={{ backgroundColor: color.code }}
          ></label>
        </div>
      ))}
    </div>
  );
};

export default ColorPicker