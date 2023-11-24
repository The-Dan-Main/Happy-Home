import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";


// Define a type for the slice state
export interface UserState {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  household: string;
  avatar_url: null;
}

// Define the initial state using that type
const initialState: UserState = {
  id: "",
  updated_at: "",
  username: "",
  full_name: "",
  household: "",
  avatar_url: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showUser(state) {
      console.log("Current state:", state);
        return state;
    },
    applyUser: (state, action: PayloadAction<UserState>) => {
        console.log("applyUser");
        console.log(action);
        
        // Mutieren Sie jedes Feld im Zustand direkt
        state.id = action.payload.id;
        state.updated_at = action.payload.updated_at;
        state.username = action.payload.username;
        state.full_name = action.payload.full_name;
        state.household = action.payload.household;
        state.avatar_url = action.payload.avatar_url;
    
        console.log("New State:", state);
    },
  },
});

export const {showUser, applyUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
