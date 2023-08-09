const { createSlice } = require("@reduxjs/toolkit");

const tourBookingSlice=createSlice({
    name:"tourBooking",
    initialState:{
        "peoples": [
            {
                "peopleId": 0,
                "bookingId": 0,
                "name": "",
                "dateOfBirth": new Date(),
                "gender": "",
                "phone": "",
                "address": ""
            }
        ]
    },
    reducers:{
        editPeople:(state,action)=>{
            state.peoples=action.payload;
        }
    }
});

//Dispatcher
export const {editPeople}=tourBookingSlice.actions;

//Store
export default tourBookingSlice.reducer;