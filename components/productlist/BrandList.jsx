"use client";
import React, { useContext } from "react";
import { ProductContext } from "@/context/ProductContext";

const BrandList = () => {
  const { brands, filters, handleFilterChange } = useContext(ProductContext);

  return (
    <ul style={{ maxHeight: "150px", overflowY: "auto" }}>
      <li>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="brand"
            id="brand-all"
            checked={filters.brand === null}
            onChange={() => handleFilterChange("brand", null)}
          />
          <label className="form-check-label" htmlFor="brand-all">
            همه برندها
          </label>
        </div>
      </li>

      {brands.map((brand, index) => (
        <li key={index}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="brand"
              id={`brand-${brand.id}`}
              checked={filters.brand === brand.id.toString()}
              onChange={() => handleFilterChange("brand", brand.id.toString())}
            />
            <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
              {brand.name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BrandList;
