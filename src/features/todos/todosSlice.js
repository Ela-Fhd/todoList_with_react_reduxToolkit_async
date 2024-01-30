import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  todos: [],
  error: null,
};

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos", {
        id: Date.now(),
        data: payload.title,
        completed: false,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload.data);
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodo = createAsyncThunk(
  "todos/toggleAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      await api.patch(`todos/${payload.id}`);
      return { id: payload.id, completed: payload.completed };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder

      // get Async Todos
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
        state.todos = [];
        state.error = null;
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; //data
        state.error = null;
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload; //error.message
      })

      // add Async Todo
      .addCase(addAsyncTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })

      // delete Async Todo
      .addCase(deleteAsyncTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      })

      // toggle Async Todo
      .addCase(toggleAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        const selectedTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        selectedTodo.completed = !action.payload.completed;
      });
  },
});

export default todosSlice.reducer;
