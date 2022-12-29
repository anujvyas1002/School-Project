import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const classSlice = createSlice({
  name: "manageClasses",
  initialState: {
    classes: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addClass.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addClass.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateClass.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeClass.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeClass.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeClass.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setClasses, setStatus } =
classSlice.actions;

export default classSlice.reducer;

// Thunks
//  fetch Api All Class Data
export const fetchClasses = createAsyncThunk("classes/fetch", async () => {
  const res = await axios.get(`http://localhost:3000/classes`);
  const data = res.data;
  return data;
});

// Add Class Api Call
export const addClass = createAsyncThunk("classes/add", async (req) => {
  const res = await axios.post(`http://localhost:3000/classes`, req);
  const data = res.data;
  return data;
});

// Edit Class Api Call
export const updateClass = createAsyncThunk(
  "classes/update",
  async (req) => {
    const res = await axios.put(`http://localhost:3000/classes/${req.id}`,req);
    const data = res.data;
    return data;
  }
);

// Remove Class Api Call
export const removeClass = createAsyncThunk(
  "classes/remove",
  async (id) => {
    const res = await axios.delete(`http://localhost:3000/classes/${id}`);
    const data = res.data;
    return data;
  }
);

