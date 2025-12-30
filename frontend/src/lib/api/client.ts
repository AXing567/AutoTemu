import createClient from "openapi-fetch";
import type { paths, components } from "./generated/schema";
import env from "@/lib/env";

const baseUrl = env.NEXT_PUBLIC_API_URL;

export const apiClient = createClient<paths>({
  baseUrl,
  credentials: "include", // 启用 Cookie
});

// 错误处理拦截器
apiClient.use({
  async onResponse({ response }) {
    // 401 错误处理（在客户端组件中会通过 next-auth 处理）
    if (response.status === 401) {
      // Token 过期，next-auth middleware 会处理重定向
      return response;
    }

    // 其他错误
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage = "请求失败";

      try {
        if (contentType?.includes("application/json")) {
          const error = await response.clone().json();
          errorMessage = error.detail || error.message || errorMessage;
        }
      } catch {
        // 无法解析为 JSON，使用默认错误信息
      }

      return response;
    }

    return response;
  },
});

export type ApiPaths = paths;
export type ApiComponents = components;
