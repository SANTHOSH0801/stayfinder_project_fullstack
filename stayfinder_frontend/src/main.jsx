import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LocationProvider } from './Contexts/LocationContext';
import {PriceRangeProvider} from './Contexts/PriceRangeContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LocationProvider>
        <PriceRangeProvider>
          <App />
        </PriceRangeProvider>
      </LocationProvider>
    </BrowserRouter>
  </StrictMode>
);