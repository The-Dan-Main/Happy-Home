import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { supabase } from "../supabase";

// Define a type for the slice state
export interface UserState {
  items: Array<any>;
  status: string;
}

// Define the initial state using that type
const initialState: UserState = {
  items: [],
  status: "",
};

export const addItemAsync = createAsyncThunk(
  "finance/addItem",
  async (item: {}) => {
    console.log("Item:", item);
    const { data, error } = await supabase
      .from("finance_entries")
      .insert(item)
      .select();
    // console.log("Data:", data);
    console.log("error:", error);

    return data;
  }
);

export const fetchItemsAsync = createAsyncThunk("finance/fetchItems", async () => {
  console.log("Fetching Items");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id as any);
//   console.log("userData:", userData);
  const { data, error } = await supabase
    .from("finance_entries")
    .select()
    .eq("household", userData.data![0].household);
//   console.log("Data:", data);
//   console.log("error:", error);

  return data;
});

export const updateItem = createAsyncThunk("", async (item: {}) => {
  console.log("Item:", item);
});

export const deleteItemAsync = createAsyncThunk("", async (id: string) => {
  // console.log("Item:", id);
  const { data, error } = await supabase
    .from("finance_entries")
    .delete()
    .eq("id", id)
    .select();

  // console.log("Data:", data);
  console.log("error:", error);

  return data![0].id;
});

export const financeSlice = createSlice({
  name: "finance",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showFinanceItems(state) {
      console.log("Current state:", state);
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------| Adding Item |----------------------------------------
      .addCase(addItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        console.log("Adding now to state:", action.payload);

        state.status = "idle";
        state.items.push(action.payload![0]);
      })
      .addCase(addItemAsync.rejected, (state) => {
        state.status = "failed";
      })
      // ------------------| Fetching Items |----------------------------------------
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        console.log("Fetched Items:", action.payload);
        action.payload!.forEach((item: any) => {
          state.items.push(item);
        });
        state.status = "idle";
      })
      .addCase(fetchItemsAsync.rejected, (state) => {
        state.status = "failed";
      })
      // ------------------| Deleting Item |----------------------------------------
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state: any, action: any) => {
        console.log("Fetched Items:", action.payload);
        const oldState = state.items;
        state.items = [];
        oldState.forEach((item: any) => {
          console.log("Item:", item);
          console.log("is equal:",item.id !== action.payload);
          
          
          if (item.id !== action.payload) state.items.push(item);
        });
        console.log("New State:", state.items);
        
        state.status = "idle";
      })
      .addCase(deleteItemAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { showFinanceItems } = financeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const financeItems = (state: RootState) => state.finance;

export default financeSlice.reducer;
