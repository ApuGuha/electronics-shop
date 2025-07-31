

export const Filters = ({ filters, onChange}) => {

    const colors = ["pink", "blue", "black", "yellow"];
    const sizes = ["XS", "S", "M", "L", "XL"];

    const handleCheckboxChange = (e, type) => {

        const value = e.target.value;
        const isChecked = e.target.checked;

        const updatedValues = isChecked
            ? [...filters[type], value]
            : filters[type].filter((v) => v !== value);

        onChange({ target: { name: type, value: updatedValues } });
    };

    const handleRangeChange = (e) => {
        onChange({target: {name: "price", value: parseInt(e.target.value)}})
    }
        
  return (
    <div className="filters">
        <div className="color-filter cmn-filter-div">
            <h3>Shop by Color:</h3>
            <div className="filter-option">
                {
                colors.map((color)=> (
                    <label key={color}>
                        <input
                            type="checkbox"
                            value={color}
                            checked={filters.color.includes(color)}
                            onChange={(e) => handleCheckboxChange(e, "color")}
                        />
                        {color}
                    </label>
                ))
            }
            </div>
        </div>
        <div className="size-filter cmn-filter-div">
            <h3>Shop by Size:</h3>
            <div className="filter-option">
                {
                sizes.map((size)=> (
                    <label key={size}>
                        <input
                            type="checkbox"
                            value={size}
                            checked={filters.size.includes(size)}
                            onChange={(e) => handleCheckboxChange(e, "size")}
                        />
                        {size}
                    </label>
                ))
            }
            </div>
        </div>
        <div className="price-filter cmn-filter-div">
            <h3>Shop by Price:</h3>
            <div>
            <input
            type="range"
            min="0"
            max="2000"
            value={filters.price}
            onChange={handleRangeChange}
            />
            </div>
        </div>
    </div>
  )
}
