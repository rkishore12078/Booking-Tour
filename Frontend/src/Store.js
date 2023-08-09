import { configureStore } from "@reduxjs/toolkit";
import tourBookingReducer from './TourSlice';

const store = configureStore({
    reducer:{ //javascript fuction
        tourBooking:tourBookingReducer,//information in state from the export of interSlice
    },
});

export default store;