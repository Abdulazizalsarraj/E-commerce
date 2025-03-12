import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);