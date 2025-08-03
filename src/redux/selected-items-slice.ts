import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedItem = {
  id: string;
  name: string;
  url: string;
};

interface SelectedItemsState {
  items: Record<string, SelectedItem>;
}

const initialState: SelectedItemsState = {
  items: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<SelectedItem>) {
      const id = action.payload.id;
      if (state.items[id]) {
        state.items = Object.fromEntries(
          Object.entries(state.items).filter(([key]) => key !== id)
        );
      } else {
        state.items[id] = action.payload;
      }
    },
    clearAll(state) {
      state.items = {};
    },
  },
});

export const { toggleItem, clearAll } = selectedItemsSlice.actions;
export const selectedItemsReducer = selectedItemsSlice.reducer;
