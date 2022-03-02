import fetchData from "../api";
import {
  Post,
  PostQueries,
  ReqPostData,
  ReqUpdateData,
  ResPostsData,
} from "../types";

export default class PostService {
  public static async getPosts(postQueries: PostQueries) {
    const { page } = postQueries;

    const response = await fetchData<ResPostsData>(
      `/posts?page=${page}`,
      "GET"
    );
    return response;
  }

  public static async getPost(postId: string) {
    const response = await fetchData<Post>(`/posts/${postId}`, "GET");
    return response;
  }

  public static async createPost(data: ReqPostData, token: string) {
    const response = await fetchData<Post>(`/posts`, "POST", data, token);
    return response;
  }

  public static async updatePost(
    postId: string,
    data: ReqUpdateData,
    token: string
  ) {
    const response = await fetchData<Post>(
      `/posts/${postId}`,
      "PATCH",
      data,
      token
    );
    return response;
  }

  public static async removePost(postId: string, token: string) {
    const response = await fetchData(`/posts/${postId}`, "DELETE", null, token);
    return response;
  }
}
