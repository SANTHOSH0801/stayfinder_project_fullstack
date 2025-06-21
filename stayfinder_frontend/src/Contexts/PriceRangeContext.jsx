import React, {createContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PriceRangeContext = createContext();

export const PriceRangeProvider = ({children}) =>{
    const [priceRange,setpriceRange] = useState("");

    return (
        <PriceRangeContext.Provider value = {{ priceRange, setpriceRange }}>
            {children}
        </PriceRangeContext.Provider>
    );
};

