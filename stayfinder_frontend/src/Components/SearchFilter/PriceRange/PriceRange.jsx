import React from 'react';
import './PriceRange.css';

const PriceRange = ({ onSelect }) => {
    const ranges = [
        { key: '1', value: [100, 10000] },
        { key: '2', value: [10000, 20000] },
        { key: '3', value: [20000, Infinity] }
    ];

    const formatRangeLabel = ([min, max]) => {
        if (max === Infinity) return `₹${min.toLocaleString()} and above`;
        return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
    };

    return (
        <div className="guest-selector" onClick={(e) => e.stopPropagation()}>
            {ranges.map(({ key, value }) => (
                <div className="guest-row" key={key} onClick={() => onSelect(value)}>
                    <div className="guest-info">
                        <div className="guest-label">{formatRangeLabel(value)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PriceRange;
