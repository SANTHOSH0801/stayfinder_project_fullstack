import React, { useState , useEffect} from 'react';
import './GuestSelector.css';

const GuestSelector = ({onChange}) => {
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0
    });

    const updateGuest = (type, delta) => {
        setGuests((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta),
        }));
    };

    useEffect(() => {
        onChange?.(guests);
    }, [guests, onChange]);

    return (
        <div className="guest-selector" onClick={(e) => e.stopPropagation()}>
            {[
                { label: 'Adults', sub: 'Ages 13 or above', key: 'adults' },
                { label: 'Children', sub: 'Ages 2–12', key: 'children' },
                { label: 'Infants', sub: 'Under 2', key: 'infants' }
            ].map(({ label, sub, key, link }) => (
                <div className="guest-row" key={key}>
                    <div className="guest-info">
                        <div className="guest-label">{label}</div>
                        <div className="guest-sub">
                            {link ? <a href="#">{sub}</a> : sub}
                        </div>
                    </div>
                    <div className="guest-controls">
                        <button type="button" onClick={() => updateGuest(key, -1)} className="btn">−</button>
                        <span className="guest-count">{guests[key]}</span>
                        <button type="button" onClick={() => updateGuest(key, 1)} className="btn">+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GuestSelector;
