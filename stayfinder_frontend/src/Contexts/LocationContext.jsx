import React, {createContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const LocationContext = createContext();

export const LocationProvider = ({children}) =>{
    const [location,setLocation] = useState("");

    return (
        <LocationContext.Provider value = {{location,setLocation}}>
            {children}
        </LocationContext.Provider>
    );
};


