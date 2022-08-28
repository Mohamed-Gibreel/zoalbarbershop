import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//PAGES
import Booking from "./pages/booking/booking";
import ScrollToTop from "./utils/ScrollToTop";
import SelectStaff from "./pages/select-staff/select_staff";
import SelectDate from "./pages/select-date/select_date";
import ConfirmNumber from "./pages/confirm-number/confirm_number";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        {/* This component forces page to scroll to top when user navigates back to a preivous page */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Booking />} />
          <Route path="/select-staff" element={<SelectStaff />} />
          <Route path="/select-date" element={<SelectDate />} />
          <Route path="/confirm-number" element={<ConfirmNumber />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
