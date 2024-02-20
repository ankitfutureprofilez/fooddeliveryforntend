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
      if (userData) {
        state._id = userData._id || "";
        state.firstName = userData.firstName || "";
        state.lastName = userData.lastName || "";
        state.email = userData.email || "";
        state.image = userData.image || "";
        state.resId =userData.resId|| "";
      }
    },

    tokenRedux: (state, action) => {
      const userData = action.payload;
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
