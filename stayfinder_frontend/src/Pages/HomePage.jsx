import React from 'react';
import NavBar from '../Components/NavBar.jsx';
import CardList from '../Components/HomePageComponents/CardList.jsx';
import SearchFilter from '../Components/SearchFilter/SearchFilter.jsx';

function HomePage() {
    return (
        <>
            <NavBar/>
            <SearchFilter/>
            <CardList/>
        </>
    )
}

export default HomePage