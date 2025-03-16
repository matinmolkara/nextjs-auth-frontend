"use client"

import React,{ useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
const BrandList = () => {
    const { brands,setBrands } =
      useContext(ProductContext);
  return (
    <ul>
      {brands.map((brand, index) => (
        <li key={index}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id={`flexCheckDefault${index}`}
            />
            <label
              className="form-check-label"
              htmlFor={`flexCheckDefault${index}`}
            >
              {brand.name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};


export default BrandList