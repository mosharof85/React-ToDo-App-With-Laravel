import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//read action
export const showTasks = createAsyncThunk(
  "showTasks",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + "tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

//update Single task

export const updateSingleTask = createAsyncThunk(
  "updateSingleTask",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        import.meta.env.VITE_API_URL + "tasks/" + id,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

//Create Single task

export const createSingleTask = createAsyncThunk(
  "createSingleTask",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "tasks",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

//Delete Single task

export const deleteSingleTask = createAsyncThunk(
  "deleteSingleTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + "tasks/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    isLoading: false,
    isError: null,
    isSuccess: false,
  },

  extraReducers: {
    //ShowAllTasks

    [showTasks.pending]: (state) => {
      state.isLoading = true;
    },

    [showTasks.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload.status == 401) {
        state.isError = "unauthorized";
      } else {
        state.isError = action.payload;
      }
    },

    [showTasks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload.data;
      state.isSuccess = true;
    },
    //UpdateSingleTask

    [updateSingleTask.pending]: (state) => {
      state.isLoading = true;
    },

    [updateSingleTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    [updateSingleTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const { id, attributes } = action.payload.data;
      state.tasks = state.tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            attributes: {
              ...task.attributes,
              ...attributes,
            },
          };
        } else {
          return task;
        }
      });
    },

    //CreateSingleTask

    [createSingleTask.pending]: (state) => {
      state.isLoading = true;
    },

    [createSingleTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    [createSingleTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = [action.payload.data, ...state.tasks];
      // state.tasks.push(action.payload.data);
    },

    //DeleteSingleTask
    [deleteSingleTask.pending]: (state) => {
      state.isLoading = true;
    },

    [deleteSingleTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    [deleteSingleTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
    },
  },
});

export const { updateTasks } = taskSlice.actions;

export default taskSlice.reducer;
