import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { MODEL_user, MODEL_Member, MODEL_NonMember } from "../../types";
import {
  customFetch,
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  handleRequestError,
} from "../../utils";
import { RootState } from "../../store";
import { RegisterAndLoginRequestResponse } from "../../types";
import { UserSliceInitialState } from "./types";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

const initialState: UserSliceInitialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: MODEL_NonMember, thunkAPI) => {
    try {
      const resp = await customFetch.post<RegisterAndLoginRequestResponse>(
        "/auth/register",
        user
      );
      return resp.data;
    } catch (error: any) {
      return handleRequestError(error, thunkAPI);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: MODEL_Member, thunkAPI) => {
    try {
      const resp = await customFetch.post<RegisterAndLoginRequestResponse>(
        "/auth/login",
        user
      );
      return resp.data;
    } catch (error: any) {
      return handleRequestError(error, thunkAPI);
    }
  }
);

//TODO : fix type
type UpdateUserResponses = RegisterAndLoginRequestResponse | any;

export const updateUser: UpdateUserResponses = createAsyncThunk<
  UpdateUserResponses,
  MODEL_user,
  {
    state: RootState;
  }
>("user/updateUser", async (user: MODEL_user, thunkAPI) => {
  try {
    const resp = await customFetch.patch<RegisterAndLoginRequestResponse>(
      "/auth/updateUser",
      user
    );
    return resp.data as RegisterAndLoginRequestResponse;
    //TODO : improve error type if possible
  } catch (error: any) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser("Unauthorized! Logging out.."));
      return thunkAPI.rejectWithValue("Unauthorized! Logging out..");
    }
    return handleRequestError(error, thunkAPI);
  }
});

export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (message: string, thunkAPI) => {
    try {
      // logout user
      thunkAPI.dispatch(logoutUser(message));
      // clear jobs value
      thunkAPI.dispatch(clearAllJobsState());
      // clear job input values
      thunkAPI.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      // console.log(error);
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    return (
      builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        registerUser.fulfilled,
        (state, { payload: { user, token, location } }) => {
          state.isLoading = false;
          state.user = user;
          addUserToLocalStorage({ user, token, location });
          toast.success(`Hello There ${user.name}`);
        }
      ),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        toast.error(payload as string);
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        loginUser.fulfilled,
        (state, { payload: { user, token, location } }) => {
          state.isLoading = false;
          state.user = user;
          addUserToLocalStorage({ user, token, location });
          toast.success(`Welcome back ${user?.name}`);
        }
      ),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        const { payload } = action;
        toast.error(payload as string);
      }),
      builder.addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateUser.fulfilled, (state, { payload: { user } }) => {
        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);
        toast.success("User Updated");
      }),
      builder.addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      }),
      builder.addCase(clearStore.rejected, () => {
        toast.error("There was an error");
      })
    );
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
