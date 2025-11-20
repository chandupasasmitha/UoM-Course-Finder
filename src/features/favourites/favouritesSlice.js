import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveFavourites, getFavourites } from "../../utils/persistence";

// Async thunk to load favourites from storage
export const loadFavourites = createAsyncThunk(
  "favourites/loadFavourites",
  async () => {
    const favourites = await getFavourites();
    return favourites || [];
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    loading: false,
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const course = action.payload;
      const existingIndex = state.favourites.findIndex(
        (fav) => fav.id === course.id
      );

      if (existingIndex >= 0) {
        // Remove from favourites
        state.favourites.splice(existingIndex, 1);
      } else {
        // Add to favourites
        state.favourites.push(course);
      }

      // Persist to storage
      saveFavourites(state.favourites);
    },
    clearFavourites: (state) => {
      state.favourites = [];
      saveFavourites([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(loadFavourites.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleFavourite, clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
