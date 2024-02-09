import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const userData = action.payload;
    // console.log("userData",userData)
      if (userData) {
        state._id = userData._id || "";
        state.firstName = userData.firstName || "";
        state.lastName = userData.lastName || "";
        state.email = userData.email || "";
        state.image = userData.image || "";
      }
    },

    tokenRedux: (state, action) => {
      const userData = action.payload;
    //  console.log("userData",userData)
      if (userData) {
        state.token = userData.token || "";
      }
    },
    
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux ,logoutRedux,tokenRedux} = userSlice.actions;

export default userSlice.reducer;
