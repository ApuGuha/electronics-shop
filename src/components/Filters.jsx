

export const Filters = ({ filters, onChange}) => {

    const colors = ["red", "blue", "black"];
    const sizes = ["8", "9", "10"];

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
        <div>
            <p><strong>Filter by Color:</strong></p>
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
        <div>
            <p><strong>Filter by Size:</strong></p>
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
        <div>
            <p><strong>Price:</strong></p>
            <input
            type="range"
            min="0"
            max="2000"
            value={filters.price}
            onChange={handleRangeChange}
            />
        </div>
    </div>
  )
}
