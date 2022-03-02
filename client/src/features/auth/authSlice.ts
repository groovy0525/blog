import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserSerivce";
import { Auth, DefaultState, ReqFormData } from "../../types";

const initialState: DefaultState<Auth> = {
  loading: false,
  data: {
    token: TokenService.get(),
    user: null,
  },
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (reqData: ReqFormData) => {
    const response = await UserService.register(reqData);
    return response;
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (reqData: ReqFormData) => {
    const response = await UserService.login(reqData);
    return response;
  }
);

export const check = createAsyncThunk("auth/check", async (_, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.data.token;

  if (!token) {
    return;
  }

  const response = await UserService.check(token);
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: state => {
      state.data.token = null;
      state.data.user = null;
      TokenService.remove();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;

        const { success } = action.payload;

        if (!success) {
          state.error = action.payload;
          return;
        }

        const { token, user } = action.payload.data;
        state.data = {
          token,
          user,
        };

        if (token) {
          TokenService.set(token);
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(check.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(check.fulfilled, (state, action) => {
        state.loading = false;

        if (!action.payload) {
          state.error = "token is not exist";
          return;
        }

        const success = action.payload.success;

        if (!success) {
          state.data.token = null;
          state.error = {
            statusCode: action.payload.statusCode,
            message: action.payload.message,
          };
          TokenService.remove();
          return;
        }

        const user = action.payload.data;

        if (user) {
          state.data.user = user;
        }
      })
      .addCase(check.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        TokenService.remove();
      })
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        const { success } = action.payload;
        if (!success) {
          state.error = action.payload;
          return;
        }

        const { token, user } = action.payload.data;
        state.data = {
          token,
          user,
        };

        if (token) {
          TokenService.set(token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
