import { SerializedError } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  createdAt: number;
}

export interface Auth {
  token: string | null;
  user: User | null;
}

export interface ReqFormData {
  username: string;
  password: string;
}

export interface ReqPostData {
  title: string;
  content: string;
}

export interface ReqUpdateData extends Partial<ReqPostData> {}

export interface Post {
  _id: string;
  user: User;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResPostsData {
  lastPage: number;
  currentPage: number;
  posts: Post[] | null;
}

export interface Posts {
  posts: ResPostsData;
  post: Post | null;
}

export interface PostQueries {
  page: number;
}

export interface DefaultState<T> {
  loading: boolean;
  data: T;
  error: SerializedError | any;
}

export interface ReturnType<T> {
  success: boolean;
  data: T;
  statusCode?: number;
  message?: string;
}
