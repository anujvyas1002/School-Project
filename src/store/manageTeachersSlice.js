import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const teacherSlice = createSlice({
  name: "manageTeachers",
  initialState: {
    teachers: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(addTeacher.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateTeacher.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeTeacher.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeTeacher.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setTeachers, setStatus} =
teacherSlice.actions;

export default teacherSlice.reducer;

// Thunks
//  fetch Api All teachers Data
export const fetchTeachers = createAsyncThunk("teachers/fetch", async () => {
  const res = await axios.get(`http://localhost:3000/teachers`);
  const data = res.data;
  return data;
});

// Add teacher Api Call
export const addTeacher = createAsyncThunk("teachers/add", async (req) => {
  const res = await axios.post(`http://localhost:3000/teachers`, req);
  const data = res.data;
  return data;
});

// Edit teacher Api Call
export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async (req) => {
    const res = await axios.put(`http://localhost:3000/teachers/${req.id}`,req);
    const data = res.data;
    return data;
  }
);

// Remove teacher Api Call
export const removeTeacher = createAsyncThunk(
  "teachers/remove",
  async (id) => {
    const res = await axios.delete(`http://localhost:3000/teachers/${id}`);
    const data = res.data;
    return data;
  }
);




