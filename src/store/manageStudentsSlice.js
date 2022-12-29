import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const studentSlice = createSlice({
  name: "manageStudents",
  initialState: {
    students: [],
    status: STATUSES.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addStudent.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateStudent.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(removeStudent.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setStudents, setStatus } =
studentSlice.actions;

export default studentSlice.reducer;

// Thunks
//  fetch Api All Student Data
export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const res = await axios.get(`http://localhost:3000/students`);
  const data = res.data;
  return data;
});

// Add Student Api Call
export const addStudent = createAsyncThunk("students/add", async (req) => {
  const res = await axios.post(`http://localhost:3000/students`, req);
  const data = res.data;
  return data;
});

// Edit Student Api Call
export const updateStudent = createAsyncThunk(
  "students/update",
  async (req) => {
    const res = await axios.put(`http://localhost:3000/students/${req.id}`,req);
    const data = res.data;
    return data;
  }
);

// Remove Student Api Call
export const removeStudent = createAsyncThunk(
  "students/remove",
  async (id) => {
    const res = await axios.delete(`http://localhost:3000/students/${id}`);
    const data = res.data;
    return data;
  }
);
