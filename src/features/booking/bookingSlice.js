import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    allServices: [],
    selectedServices: [],
    selectedStaff: {},
    selectedStartDate: new Date(Date.now()).toString(),
    selectedEndDate: new Date(Date.now()).toString(),
  },
  reducers: {
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
    selectService: (state, action) => {
      state.selectedServices.push(action.payload);
    },
    removeService: (state, action) => {
      state.selectedServices = state.selectedServices.filter((service) => {
        return action.payload.id != service.id;
      });
    },
    setSelectedStaff: (state, action) => {
      state.selectedStaff = action.payload;
    },
    setSelectedStartDate: (state, action) => {
      state.selectedStartDate = action.payload;
    },
    setSelectedEndDate: (state, action) => {
      state.selectedEndDate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectService,
  removeService,
  setAllServices,
  setSelectedStaff,
  setSelectedStartDate,
  setSelectedEndDate,
} = bookingSlice.actions;

export const selectedServices = (state) => state.booking.selectedServices;

export const allServices = (state) => state.booking.allServices;

export const selectedStaff = (state) => state.booking.selectedStaff;

export const selectedStartDate = (state) => state.booking.selectedStartDate;

export const selectedEndDate = (state) => state.booking.selectedEndDate;

export default bookingSlice.reducer;
