// import { useNavigate, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useRef, useContext } from 'react'
import '../SearchFilter/SearchFilter.css'
import GuestSelector from './GuestsList/GuestSelector.jsx';
import { useNavigate } from 'react-router-dom';
import { LocationContext } from '../../Contexts/LocationContext.jsx'
import PriceRange from './PriceRange/PriceRange.jsx'
import { PriceRangeContext } from '../../Contexts/PriceRangeContext.jsx'


function SearchFilter() {


    const navigate = useNavigate();

    const [searchActive, setSearchActive] = useState(false);
    const searchRef = useRef(null);

    const [GuestSelect, setGuestSelect] = useState(false);
    const GuestRef = useRef(null);

    const { location, setLocation } = useContext(LocationContext)
    const { priceRange, setpriceRange } = useContext(PriceRangeContext)

    const [tempLocation, setTempLocation] = useState(location);


    const [priceselect, setPriceSelect] = useState(false)
    const PriceSelectRef = useRef(null);


    function handlePriceSelect(option) {
        setPriceSelect(false)
        setpriceRange(option)
    }

    function handleLocation(loc) {
        setTempLocation(loc);      // only updates the input field
        setSearchActive(false);    // closes the dropdown
    }


    function handleSearch() {
        setLocation(tempLocation); // now update context value
        navigate('/SearchResultsPage');
    }

    function handleGuestSelect() {
        setGuestSelect(!GuestSelect);
    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (PriceSelectRef.current && !PriceSelectRef.current.contains(event.target)) {
                setPriceSelect(false);
            }
        }
        if (priceselect) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [priceselect]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (GuestRef.current && !GuestRef.current.contains(event.target)) {
                setGuestSelect(false);
            }
        }
        if (GuestSelect) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [GuestSelect]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchActive(false);
            }
        }

        if (searchActive) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }


    }, [searchActive])

    return (
        <div className="search-bar-container" ref={searchRef}>
            <div
                className="search-bar"
            >
                <input
                    type="text"
                    placeholder="Search destinations"
                    className="search-input"
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    onFocus={() => setSearchActive(true)}
                />

                <div className="date-box-wrapper">
                    <div className="date-range">
                        <div className="description2">
                            Check in
                        </div>
                        <input required type="date" />
                    </div>

                    <div className="date-range">
                        <div className="description2">
                            Check Out
                        </div>
                        <input required type="date" />
                    </div>

                </div>
                <div onClick={() => handleGuestSelect()} >
                    <div className="guest-select2">
                        <span>Add guests</span>
                        {GuestSelect && (
                            <div ref={GuestRef}>
                                <GuestSelector />
                            </div>
                        )}
                    </div>
                </div>
                {searchActive && (
                    <div className="container2">
                        <div className="dropdown">
                            <div className="section-title">Recent searches</div>
                            <div className="dropdown-item" onClick={() => { handleLocation("North Goa") }}>
                                <span role="img" aria-label="beach">🏖️</span> North Goa <small>19–21 Jun</small>
                            </div>

                            <div className="section-title">Suggested destinations</div>

                            <div className="dropdown-item" onClick={() => handleLocation("Hyderabad")}>📍 Nearby – Find what’s around you</div>
                            <div className="dropdown-item" onClick={() => handleLocation("Puducherry")}>🌴 Puducherry – Popular beach destination</div>
                            <div className="dropdown-item" onClick={() => handleLocation("South Goa")}>🏝️ South Goa – Guests also looked here</div>
                            <div className="dropdown-item" onClick={() => handleLocation("Calangute")}>🌆 Calangute – Bustling nightlife</div>
                            <div className="dropdown-item" onClick={() => handleLocation("Tirupati")}>⛩️ Tirupati – Popular nearby</div>
                        </div>
                    </div>
                )}
                <div className="guest-select2" onClick={() => setPriceSelect(!priceselect)}>
                    <span>
                        {priceRange
                            ? priceRange[1] === Infinity
                                ? `₹${priceRange[0].toLocaleString()} and above`
                                : `₹${priceRange[0].toLocaleString()} - ₹${priceRange[1].toLocaleString()}`
                            : "Select Price range"}
                    </span>

                    {priceselect && (
                        <div ref={PriceSelectRef}>
                            <PriceRange onSelect={handlePriceSelect} />
                        </div>
                    )}
                </div>

                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        </div>
    )
}

export default SearchFilter