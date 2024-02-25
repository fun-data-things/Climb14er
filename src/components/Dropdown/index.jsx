const Dropdown = ({ value, dropdownItems, handleDropdownSelection }) => {
    return (
        <select 
            value={value}
            name="dropdown" 
            onChange={(e) => handleDropdownSelection(e.target.value)}
        >
            {dropdownItems.map((dropdownItem) => (
            <option
                key={dropdownItem}
                value={dropdownItem}
            >
                {dropdownItem}
            </option>
            ))}
        </select>
    );
};

export default Dropdown;