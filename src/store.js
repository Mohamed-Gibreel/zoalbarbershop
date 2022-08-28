import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./features/booking/bookingSlice";

export default configureStore({
  reducer: {
    booking: bookingSlice,
  },
});
