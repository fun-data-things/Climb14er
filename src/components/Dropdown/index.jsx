const Dropdown = ({ dropdownItems, handleDropdownSelection }) => {
    return (
        <select name="dropdown" onChange={(e) => handleDropdownSelection(e.target.value)}>
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