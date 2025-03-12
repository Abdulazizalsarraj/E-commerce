import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"; 

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
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