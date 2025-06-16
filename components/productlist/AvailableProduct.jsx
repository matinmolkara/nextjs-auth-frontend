"use client";
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";

const AvailableProduct = () => {
  const { handleFilterChange, filters } = useContext(ProductContext);

  return (
    <div>
      <ul>
        <li>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="available-switch"
              checked={filters.available}
              onChange={(e) =>
                handleFilterChange("available", e.target.checked)
              }
            />
            <label className="form-check-label" htmlFor="available-switch">
              فقط کالای موجود
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AvailableProduct;
