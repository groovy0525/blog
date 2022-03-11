import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import PostService from "../../services/PostService";
import { DefaultState, Posts, ReqPostData, ReqUpdateData } from "../../types";

const initialState: DefaultState<Posts> = {
  loading: false,
  data: {
    posts: {
      lastPage: 1,
      currentPage: 1,
      posts: null,
    },
    post: null,
  },
  error: null,
};

export const find = createAsyncThunk("post/find", async (_, { getState }) => {
  const state = getState() as RootState;

  const { lastPage, currentPage } = state.post.data.posts;

  if (currentPage > lastPage) {
    return;
  }

  const response = await PostService.getPosts({ page: currentPage });
  return response;
});

export const findOne = createAsyncThunk(
  "post/findOne",
  async (postId: string) => {
    const response = await PostService.getPost(postId);
    return response;
  }
);

export const create = createAsyncThunk(
  "post/create",
  async (postData: ReqPostData, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.data.token;

    if (!token) {
      return;
    }

    const response = await PostService.createPost(postData, token);
    return response;
  }
);

export const update = createAsyncThunk(
  "post/update",
  async (postData: { postId: string; data: ReqUpdateData }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.data.token;

    if (!token) {
      return;
    }

    const { postId, data } = postData;

    const response = await PostService.updatePost(postId, data, token);
    return response;
  }
);

export const remove = createAsyncThunk(
  "post/remove",
  async (postId: string, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.data.token;

    if (!token) {
      return;
    }

    const response = await PostService.removePost(postId, token);
    return response;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(find.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(find.fulfilled, (state, action) => {
        state.loading = false;

        if (!action.payload) {
          return;
        }

        const success = action.payload.success;

        if (!success) {
          state.error = action.payload;
          return;
        }

        const { posts, lastPage } = action.payload.data;

        if (posts) {
          const statePosts = state.data.posts.posts;
          if (Array.isArray(statePosts)) {
            state.data.posts.posts?.push(...posts);
          } else {
            state.data.posts.posts = posts;
          }
          state.data.posts.lastPage = lastPage;
          state.data.posts.currentPage += 1;
        }
      })
      .addCase(find.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(findOne.pending, state => {
        state.loading = true;
        state.data.post = null;
        state.error = null;
      })
      .addCase(findOne.fulfilled, (state, action) => {
        state.loading = false;

        const success = action.payload.success;

        if (!success) {
          state.error = action.payload;
          return;
        }

        state.data.post = action.payload.data;
      })
      .addCase(findOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(create.pending, state => {
        state.loading = true;
        state.data.post = null;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;

        const success = action.payload?.success;

        if (!success) {
          state.error = action.payload;
          return;
        }

        const post = action.payload?.data;

        if (post) {
          state.data.post = post;
          state.data.posts.posts?.unshift(post);
        }
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(remove.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.loading = false;

        const success = action.payload?.success;

        if (!success) {
          state.error = action.payload;
          return;
        }

        const idx = state.data.posts.posts?.findIndex(
          post => post._id === action.meta.arg
        );
        state.data.post = null;

        if (typeof idx === "number" && idx >= 0) {
          state.data.posts.posts?.splice(idx, 1);
        }
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const selectLoading = (state: RootState) => state.post.loading;

export default postSlice.reducer;
