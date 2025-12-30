import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import env from "@/lib/env";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "邮箱", type: "email", placeholder: "user@example.com" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // 1. 调用 FastAPI 登录端点
          const tokenResponse = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/login/access-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          if (!tokenResponse.ok) {
            const error = await tokenResponse.json();
            throw new Error(error.detail || "登录失败");
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          // 2. 使用 token 获取用户信息
          const userResponse = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/login/test-token`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error("无法获取用户信息");
          }

          const user = await userResponse.json();

          return {
            id: user.id,
            email: user.email,
            name: user.full_name || user.email,
            is_superuser: user.is_superuser || false,
            accessToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.is_superuser = user.is_superuser;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.is_superuser = token.is_superuser;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 小时
    updateAge: 60 * 60, // 1 小时更新一次
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 小时
  },
  events: {
    async signOut() {
      // 可在此处添加登出后的清理逻辑
    },
  },
  secret: env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
