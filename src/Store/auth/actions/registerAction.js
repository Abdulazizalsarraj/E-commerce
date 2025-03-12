import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; 

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        user: userCredential.user,
        token: userCredential.user.accessToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

