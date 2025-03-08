import React from 'react'

const SpecialOffer = () => {
  return (
    <div>
      <ul>
        <li>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              دارای تخفیف
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SpecialOffer