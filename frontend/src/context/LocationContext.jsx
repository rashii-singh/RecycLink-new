import React, { createContext, useState, useContext, useEffect } from 'react';

export const PRESET_LOCATIONS = [
    { name: 'REVA University', sub: 'Bangalore, KA', lat: 13.1147, lng: 77.6347 },
    { name: 'Indiranagar', sub: 'Bangalore, KA', lat: 12.9784, lng: 77.6408 },
    { name: 'Koramangala', sub: 'Bangalore, KA', lat: 12.9352, lng: 77.6245 },
    { name: 'Whitefield', sub: 'Bangalore, KA', lat: 12.9698, lng: 77.7500 }
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
