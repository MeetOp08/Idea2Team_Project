import '../../styles/SearchBar.css';
import React from 'react';

const SearchBar = ({ placeholder = 'Search...', className = '', value, onChange }) => {
    return (
        <div className={`search-bar ${className}`}>
            <span className="search-bar-icon">🔍</span>
            <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
};

export default SearchBar;
