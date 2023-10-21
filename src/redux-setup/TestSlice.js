const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  pros: [],
};

const TestSlice = createSlice({
  name: "TestSlice",
  initialState,
  reducers: {
    setPros: (state, action) => {
      state.pros = action.payload;
    },
  },
});
export const { setPros } = TestSlice.actions;
export default TestSlice.reducer;
