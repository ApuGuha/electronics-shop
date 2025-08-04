import React, { useState } from "react";

export const Filters = ({ filters, onChange }) => {
  const colors = ["pink", "blue", "black", "yellow"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const minPrice = 0;
  const maxPrice = 2000;

  const [percentage, setPercentage] = useState(
    ((filters.price - minPrice) / (maxPrice - minPrice)) * 100
  );

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    const updatedValues = isChecked
      ? [...filters[type], value]
      : filters[type].filter((v) => v !== value);

    onChange({ target: { name: type, value: updatedValues } });
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    onChange({ target: { name: "price", value } });
    setPercentage(((value - minPrice) / (maxPrice - minPrice)) * 100);
  };

  return (
    <div className="filters">
      {/* Color filter */}
      <div className="color-filter cmn-filter-div">
        <h3>Shop by Color:</h3>
        <div className="filter-option">
          {colors.map((color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={filters.color.includes(color)}
                onChange={(e) => handleCheckboxChange(e, "color")}
              />
              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div className="size-filter cmn-filter-div">
        <h3>Shop by Size:</h3>
        <div className="filter-option">
          {sizes.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                checked={filters.size.includes(size)}
                onChange={(e) => handleCheckboxChange(e, "size")}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div className="price-filter cmn-filter-div">
        <h3>Shop by Price:</h3>
        <div className="slider-container">
          {/* Price range labels */}
          <div className="price-range-labels">
            <span className="min-price">${minPrice}</span>
            <span className="max-price">${maxPrice}</span>
          </div>

          {/* Tooltip stays visible */}
          <div
            className="tooltip active"
            style={{ left: `calc(${percentage}% - 20px)` }}
          >
            ${filters.price}
          </div>

          {/* Range slider */}
          <input
            className="price-slider"
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.price}
            onInput={handleRangeChange}
            style={{
              background: `linear-gradient(to right, #db4444 ${percentage}%, #ddd ${percentage}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
