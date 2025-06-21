import {AppRoutes} from './utils/Constant.js';
import {Routes, Route} from 'react-router-dom';

import HomePage from './Pages/HomePage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import ListingDetailPage from './Pages/ListingDetailPage.jsx';
import SearchResultsPage from './Pages/SearchResultsPage.jsx';
import BookingSuccessfulPage from './Pages/BookingSuccessfulPage.jsx';
import HostDashboard from './Pages/HostDashboard.jsx';
import HostEditListing from './Pages/HostEditListing.jsx';

function AppRoutesWithLayouts() {
    return (
        <Routes>
            
            <Route path={AppRoutes.HomePage} element={<HomePage />} />
            <Route path = {AppRoutes.SignupPage} element = {<SignupPage />}/>
            <Route path = {AppRoutes.LoginPage} element = {<LoginPage />}/>
            <Route path = {AppRoutes.SearchResultsPage} element = {<SearchResultsPage/>}/>
            <Route path= '/listings/:id' element={<ListingDetailPage />} />
            <Route path = {AppRoutes.BookingSuccessfulPage} element = {<BookingSuccessfulPage />}/>
            <Route path = '/HostDashboard' element = {<HostDashboard />} />
            <Route path = '/host-edit-listing/:id' element = {<HostEditListing />} />
            {/* Add more routes here as needed */}
        </Routes>
    );
}

export default AppRoutesWithLayouts;
