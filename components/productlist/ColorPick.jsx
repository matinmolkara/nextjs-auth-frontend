import React from 'react'

const ColorPick = () => {
  return (
    <div>
      <div className="color-filter">
        <input type="checkbox" id="color1" className="color-checkbox" />
        <label
          htmlFor="color1"
          className="color-circle"
          style={{ backgroundColor: "#006cff" }}
        ></label>

        <input type="checkbox" id="color2" className="color-checkbox" />
        <label
          htmlFor="color2"
          className="color-circle"
          style={{ backgroundColor: "#fc3e39" }}
        ></label>

        <input type="checkbox" id="color3" className="color-checkbox" />
        <label
          htmlFor="color3"
          className="color-circle"
          style={{ backgroundColor: "#171717" }}
        ></label>

        <input type="checkbox" id="color4" className="color-checkbox" />
        <label
          htmlFor="color4"
          className="color-circle"
          style={{ backgroundColor: "#fff600" }}
        ></label>

        <input type="checkbox" id="color5" className="color-checkbox" />
        <label
          htmlFor="color5"
          className="color-circle"
          style={{ backgroundColor: "#ff00b4" }}
        ></label>
      </div>
    </div>
  );
}

export default ColorPick