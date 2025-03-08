import React from 'react'

const PriceRange = () => {
  return (
    <div>
      <div className="filter-range-box">
        <input
          type="range"
          className="form-range"
          min="100000"
          max="50000000"
          id="customRange2"
          onInput={() => (this.nextElementSibling.value = this.value)}
        />
        <output>100000</output>
        <span>تومان</span>
      </div>
    </div>
  );
}

export default PriceRange