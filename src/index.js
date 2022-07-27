import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./pages/booking/booking";
import ScrollToTop from "./pages/ScrollToTop";
import SelectStaff from "./pages/select-staff/select_staff";
import SelectDate from "./pages/select-date/select_date";
import ConfirmNumber from "./pages/confirm-number/confirm_number";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/select-staff" element={<SelectStaff />} />
        <Route path="/select-date" element={<SelectDate />} />
        <Route path="/confirm-number" element={<ConfirmNumber />} />
        {/* <Route path="/booking" element={<BookingPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
