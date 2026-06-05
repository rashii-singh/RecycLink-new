import React, { createContext, useState, useContext, useEffect } from 'react';

export const PRESET_LOCATIONS = [
    { name: 'Sapthagiri NPS University', sub: 'Bangalore, KA', lat: 13.0674, lng: 77.49 }
];

const LocationContext = createContext();

export function LocationProvider({ children }) {
    const [selectedLoc, setSelectedLoc] = useState(() => {
        const saved = localStorage.getItem('selectedLocation');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return PRESET_LOCATIONS[0];
            }
        }
        return PRESET_LOCATIONS[0];
    });

    useEffect(() => {
        localStorage.setItem('selectedLocation', JSON.stringify(selectedLoc));
    }, [selectedLoc]);

    return (
        <LocationContext.Provider value={{ selectedLoc, setSelectedLoc, PRESET_LOCATIONS }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocationContext() {
    return useContext(LocationContext);
}
