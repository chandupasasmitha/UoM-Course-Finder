import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../../api/courseService";
import {
  saveAuthData,
  getAuthData,
  removeAuthData,
} from "../../utils/persistence";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await courseService.login(username, password);
      await saveAuthData(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for checking persisted auth
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const authData = await getAuthData();
  return authData;
});

// Async thunk for logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await removeAuthData();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: true,
  },
  reducers: {
    register: (state, action) => {
      // Mock registration - in production, this would call an API
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          image: action.payload.image,
        };
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { register, clearError } = authSlice.actions;
export default authSlice.reducer;
