"use client"
import React, { useState ,useContext} from "react";
import { ProductContext } from "@/context/ProductContext";
import ColorPicker from './ColorPicker';
import SizePicker from "./SizePicker";
const ProductOptions = ({ onColorSelect, onSizeSelect }) => {
  const { productColors, shirtSizes, shoeSizes } = useContext(ProductContext);
  
  const handleColorChange = (color) => {
    onColorSelect(color);
    console.log("رنگ انتخاب‌شده:", color);
  };
  const handleSizeChange = (size) => {
    onSizeSelect(size);
    console.log("سایز انتخاب‌شده:", size);
  };

  return (
    <div>
      <div className="product-detail-shop">
        <div className="product-detail-shop-property">
          <ul>
            <li>
              <span> انتخاب رنگ: </span>
              <span>
                {/* <p>
                  رنگ انتخاب‌شده:{" "}
                  {selectedColor ? `${selectedColor.name}` : "هنوز انتخاب نشده"}
                </p> */}
                <ColorPicker
                  colors={productColors}
                  onColorSelect={handleColorChange}
                />
              </span>
            </li>
            <li>
              <span> انتخاب سایز: </span>
              <span>
                {/* <p>سایز انتخاب‌شده: {selectedSize || "هنوز انتخاب نشده"}</p> */}
                <SizePicker sizes={shoeSizes} onSizeSelect={handleSizeChange} />
                <SizePicker
                  sizes={shirtSizes}
                  onSizeSelect={handleSizeChange}
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions