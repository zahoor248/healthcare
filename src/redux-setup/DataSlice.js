const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  pros: [],
};

const DataSlice = createSlice({
  name: "DataSlice",
  initialState,
  reducers: {
    setPros: (state, action) => {
      state.pros = action.payload;
    },
  },
});
export const { setPros } = DataSlice.actions;
export default DataSlice.reducer;
