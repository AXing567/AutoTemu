import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;

      // 公开路由（无需认证）
      const publicRoutes = ["/login", "/signup", "/password-recovery", "/reset-password"];
      if (publicRoutes.some((route) => pathname.startsWith(route))) {
        // 已登录用户不能访问认证页面
        return !token;
      }

      // 其他路由需要登录
      if (!token) {
        return false;
      }

      // 超级管理员路由
      if (pathname.startsWith("/users") && !token.is_superuser) {
        // 需要重定向到 403，但中间件无法做到
        // 将在页面组件中进行检查
        return true;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

// 配置中间件匹配的路由
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了:
     * - api (API 路由)
     * - _next/static (静态文件)
     * - _next/image (图像优化文件)
     * - favicon.ico (favicon 文件)
     * - public 目录下的文件
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
