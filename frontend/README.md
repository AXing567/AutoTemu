# AutoTemu 管理后台前端

基于 Next.js + Shadcn/UI + TanStack Query 的全栈管理系统前端。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **UI**: Shadcn/UI (Radix UI + Tailwind CSS)
- **状态管理**: TanStack Query (React Query)
- **表单**: React Hook Form + Zod
- **认证**: next-auth v5
- **API 客户端**: openapi-typescript + openapi-fetch

## 快速开始

### 前置要求

- Node.js 18+
- npm 或 pnpm
- 后端 API 正在运行 (`http://localhost:8000`)

### 安装依赖

```bash
npm install
```

### 环境配置

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

更新 `NEXTAUTH_SECRET` 为随机字符串（用于生产环境）。

### 生成 API 类型

从后端 OpenAPI 规范生成 TypeScript 类型：

```bash
npm run generate-api
```

这将生成 `src/lib/api/generated/schema.ts` 文件，包含所有 API 端点的类型定义。

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

访问 `/login` 页面登录。

## 项目结构

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证路由组
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (dashboard)/              # 管理后台路由组
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── items/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── api/auth/[...nextauth]/   # 认证 API 路由
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页重定向
│   └── globals.css               # 全局样式
├── components/
│   ├── ui/                       # Shadcn UI 组件
│   ├── layout/                   # 布局组件
│   ├── auth/                     # 认证相关组件
│   ├── users/                    # 用户管理组件
│   ├── items/                    # 项目管理组件
│   ├── settings/                 # 设置组件
│   └── common/                   # 通用组件
├── lib/
│   ├── api/                      # API 客户端
│   │   ├── client.ts             # API 客户端配置
│   │   ├── generated/schema.ts   # 自动生成的类型
│   │   ├── auth.ts               # 认证 API
│   │   ├── users.ts              # 用户 API
│   │   └── items.ts              # 项目 API
│   ├── hooks/                    # 自定义 Hooks
│   ├── validations/              # Zod 验证 Schema
│   ├── utils.ts                  # 工具函数
│   ├── env.ts                    # 环境变量
│   └── query-client.ts           # TanStack Query 配置
├── types/                        # 全局类型定义
└── middleware.ts                 # Next.js 中间件（认证守卫）
```

## 核心功能

### 认证系统
- 登录/注册
- 密码恢复/重置
- Token 管理
- 路由守卫

### 用户管理（仅超级管理员）
- 用户列表（分页）
- 用户详情
- 创建/编辑用户
- 删除用户

### 项目管理
- 项目列表（分页）
- 项目详情
- 创建/编辑项目
- 删除项目

### 个人设置
- 修改个人信息
- 修改密码
- 删除账户

## API 集成

### 生成类型定义

后端 API 变更后，运行此命令重新生成类型：

```bash
npm run generate-api
```

### 使用 API 客户端

```typescript
import { apiClient } from "@/lib/api/client";

// GET 请求
const { data, error } = await apiClient.GET("/api/v1/users/", {
  params: { query: { skip: 0, limit: 10 } },
});

// POST 请求
const { data, error } = await apiClient.POST("/api/v1/items/", {
  body: { title: "New Item", description: "..." },
});
```

所有请求都会自动注入 Authorization header（来自 next-auth）。

## 开发脚本

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 生产服务器
npm start

# 代码检查
npm run lint
npm run lint:fix

# 代码格式化
npm run format

# 类型检查
npm run type-check

# 生成 API 类型
npm run generate-api

# 测试
npm run test
npm run test:ui
npm run test:coverage

# E2E 测试
npm run e2e
npm run e2e:ui
```

## 协作开发

### 分工

**开发者 A**: 认证系统 + 用户管理模块
- 认证页面
- 用户管理 CRUD
- API 集成

**开发者 B**: UI 基础设施 + 项目管理模块
- 布局组件
- 项目管理 CRUD
- 设置页面

### 工作流

1. 创建特性分支: `git checkout -b feature/your-feature`
2. 编写代码并测试
3. 格式化代码: `npm run format`
4. 类型检查: `npm run type-check`
5. 提交: `git commit -m "feat: description"`
6. 推送: `git push origin feature/your-feature`
7. 创建 PR

### 代码规范

- 组件文件: PascalCase (`UserForm.tsx`)
- 函数: camelCase (`getUserById`)
- 常量: UPPER_SNAKE_CASE (`API_BASE_URL`)
- 路由文件: kebab-case (`password-recovery`)

## 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `NEXT_PUBLIC_APP_NAME` | 应用名称 | AutoTemu 管理后台 |
| `NEXT_PUBLIC_API_URL` | 后端 API URL | http://localhost:8000 |
| `NEXT_PUBLIC_FRONTEND_URL` | 前端 URL | http://localhost:3000 |
| `NEXTAUTH_URL` | Next-Auth URL | http://localhost:3000 |
| `NEXTAUTH_SECRET` | JWT 密钥 | 随机字符串 |

## 故障排除

### API 连接失败

1. 确保后端 API 正在运行: `http://localhost:8000/docs`
2. 检查 `.env.local` 中的 `NEXT_PUBLIC_API_URL`
3. 检查浏览器控制台的错误信息

### 登录失败

1. 确认邮箱和密码正确
2. 检查后端是否返回正确的 token
3. 查看浏览器 Network 标签中的请求

### 类型错误

1. 运行 `npm run generate-api` 重新生成 API 类型
2. 运行 `npm run type-check` 进行类型检查
3. 检查 `src/lib/api/generated/schema.ts` 是否正确生成

## 常用命令

```bash
# 开发环境启动（同时启动后端和前端）
# 终端 1: 后端
cd ../backend && uvicorn app.main:app --reload

# 终端 2: 前端
npm run dev

# 访问应用
open http://localhost:3000
```

## 部署

### 生产构建

```bash
npm run build
npm start
```

### 环境变量设置

在生产环境中，需要设置以下环境变量：

```bash
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-random-secret-key
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### Docker 部署

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

## 许可证

MIT

## 支持

如有问题或建议，请创建 Issue 或联系开发团队。
