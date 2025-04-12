"use client"
import React, { useContext} from "react";
import { ProductContext } from "@/context/ProductContext";
import ColorPicker from './ColorPicker';
import SizePicker from "./SizePicker";
const ProductOptions = ({ onColorSelect, onSizeSelect }) => {
  const { productSizes, productColors } = useContext(ProductContext);

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
            {productColors && productColors.length > 0 && (
              <li>
                <span> انتخاب رنگ: </span>
                <span>
                  <ColorPicker
                    colors={productColors}
                    onColorSelect={handleColorChange}
                  />
                </span>
              </li>
            )}
            {productSizes && productSizes.length > 0 && (
              <li>
                <span> انتخاب سایز: </span>
                <span>
                  <SizePicker
                    sizes={productSizes}
                    onSizeSelect={handleSizeChange}
                  />
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions