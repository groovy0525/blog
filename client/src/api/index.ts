import { ReturnType } from "../types";

enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const fetchData = async <T>(
  url: string,
  method: keyof typeof Method,
  data?: any,
  token?: string
): Promise<ReturnType<T>> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: data && JSON.stringify(data),
  });
  return await response.json();
};

export default fetchData;
