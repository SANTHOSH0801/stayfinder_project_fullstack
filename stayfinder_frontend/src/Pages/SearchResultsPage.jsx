import React, { useContext } from 'react'
import '../css/SearchResultsPage.css'

import ListingGridview from '../Components/SearchResultsPageComponents/ListingGridview.jsx'
import NavBar from '../Components/NavBar.jsx'
import MapComponent from '../Components/SearchResultsPageComponents/MapComponent.jsx'
import { LocationContext } from '../Contexts/LocationContext';
import SearchFilter from '../Components/SearchFilter/SearchFilter.jsx'

function SearchResultsPage() {
    const { setLocation } = useContext(LocationContext);

    return (
        <>
            <NavBar />
            <div>
                <SearchFilter/>
            </div>
            <div className="results-section-wrapper">
                <div className='search-results-wrapper'>
                    <div className='leftside'>
                        <ListingGridview />
                    </div>
                    <div className='rightside'>
                        <MapComponent setLocation={setLocation} />
                    </div>
                </div>
            </div>
            <div className="hr-l"></div>
        </>
    )
}

export default SearchResultsPage