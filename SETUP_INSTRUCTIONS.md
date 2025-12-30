# AutoTemu 前端开发 - 开始使用指南

## 📋 目前状态

**Phase 1 已完成 ✅**

前端项目框架已初始化，所有基础设施和认证系统已实现。

## 🚀 快速开始（5分钟）

### 步骤 1: 安装依赖（2-3分钟）

```bash
cd D:\AutoTemu\frontend
npm install
```

### 步骤 2: 生成 API 类型（1分钟）

```bash
npm run generate-api
```

如果后端未运行，此步骤会失败。确保后端在 `http://localhost:8000` 运行。

### 步骤 3: 启动前端开发服务器

```bash
npm run dev
```

等待输出：
```
  ▲ Next.js 15.0.3
  - Local:        http://localhost:3000
```

### 步骤 4: 在浏览器打开应用

访问: `http://localhost:3000`

应该自动重定向到 `/login`

## 🔐 测试登录

### 创建测试账户

1. 点击 "注册" 链接
2. 填写邮箱、密码、姓名
3. 点击 "注册"
4. 重定向到登录页
5. 使用刚才的邮箱和密码登录

或使用后端提供的演示账户（如果有）：
- 邮箱: `admin@example.com`
- 密码: `changeme`

### 成功的标志

✅ 登录后进入仪表板（`/dashboard`）
✅ 看到欢迎信息和快捷入口
✅ 可以看到"我是超级管理员"（如果是管理员账户）

## 📂 项目文件概览

| 文件/目录 | 说明 |
|---------|------|
| `src/app/(auth)` | 认证页面（登录/注册） |
| `src/app/(dashboard)` | 管理后台页面 |
| `src/lib/api/` | API 客户端 |
| `src/app/api/auth/[...nextauth]/` | 认证系统核心 |
| `.env.local` | 本地环境配置 |
| `README.md` | 完整文档 |
| `QUICKSTART.md` | 快速指南 |

## 🛠️ 日常开发命令

```bash
# 启动开发服务器（最常用）
npm run dev

# 代码格式化
npm run format

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 后端 API 变更后重新生成类型
npm run generate-api

# 构建生产版本
npm run build
npm start
```

## 📊 当前实现的功能

✅ 登录/注册页面
✅ 认证系统（JWT）
✅ 路由守卫（中间件）
✅ 仪表板首页
✅ 环境配置
✅ API 客户端框架

⏳ 用户管理（Phase 2）
⏳ 项目管理（Phase 2）
⏳ 个人设置（Phase 3）
⏳ 密码恢复（Phase 3）

## 🔧 后端 API 要求

确保后端在运行并且 OpenAPI 文档可访问：

- API 基础URL: `http://localhost:8000`
- OpenAPI 文档: `http://localhost:8000/docs`
- OpenAPI JSON: `http://localhost:8000/api/v1/openapi.json`

## ❓ 常见问题

### Q: 运行 `npm install` 失败了怎么办？

A: 尝试以下步骤：
```bash
# 1. 删除缓存
npm cache clean --force

# 2. 重新安装
npm install

# 3. 如果还是失败，使用 npm ci
npm ci
```

### Q: `npm run generate-api` 失败

A: 确保：
1. 后端正在运行: `http://localhost:8000/docs`
2. OpenAPI 文档可访问
3. 网络连接正常

### Q: 登录时出现 "无法连接" 错误

A: 检查：
1. 后端是否正在运行
2. `.env.local` 中的 `NEXT_PUBLIC_API_URL` 是否正确（默认 `http://localhost:8000`）
3. 浏览器控制台（F12）的详细错误信息

### Q: 登录成功但无法进入仪表板

A: 尝试：
1. 清除浏览器 Cookie: 按 F12 → Application → Cookies → 删除所有
2. 重新登录
3. 检查 `NEXTAUTH_SECRET` 是否在 `.env.local` 中设置

## 📋 两人开发工作流

### 开发者 A（后端集成者）

主要负责：
1. API 集成 (`src/lib/api/`)
2. 数据获取 Hooks (`src/lib/hooks/`)
3. 类型定义 (`src/lib/validations/`)

建议使用分支: `feature/api-integration`

### 开发者 B（前端功能者）

主要负责：
1. 页面组件 (`src/app/`)
2. UI 组件 (`src/components/`)
3. 用户交互逻辑

建议使用分支: `feature/ui-implementation`

### 同步合并

每天至少同步一次主分支：
```bash
git fetch origin
git rebase origin/main
```

## 🎯 Phase 2 准备清单

下一个阶段需要实现：

### 开发者 A 的任务
- [ ] 创建用户 API 服务 (`src/lib/api/users.ts`)
- [ ] 创建用户 Hooks (`src/lib/hooks/use-users.ts`)
- [ ] 创建项目 API 服务 (`src/lib/api/items.ts`)
- [ ] 创建项目 Hooks (`src/lib/hooks/use-items.ts`)

### 开发者 B 的任务
- [ ] 安装 Shadcn UI 组件: `npx shadcn@latest add table dialog button ...`
- [ ] 创建导航栏 (`src/components/layout/navbar.tsx`)
- [ ] 创建侧边栏 (`src/components/layout/sidebar.tsx`)
- [ ] 创建数据表格 (`src/components/common/data-table.tsx`)

### 共同任务
- [ ] 定义用户和项目的验证 Schema
- [ ] 设计 API 响应类型
- [ ] 规划路由结构

## 📞 需要帮助？

1. 检查 `README.md` - 完整文档
2. 检查 `QUICKSTART.md` - 快速指南
3. 查看计划文件 - 详细的实现计划
4. 检查后端 API 文档 - `http://localhost:8000/docs`

## 🎉 下一步

你已经可以开始开发了！

### 推荐的第一步：

1. **测试应用是否运行**
   ```bash
   npm install && npm run dev
   ```

2. **尝试注册和登录**
   - 访问 `http://localhost:3000`
   - 创建测试账户
   - 登录确认是否进入仪表板

3. **熟悉项目结构**
   - 浏览 `src/app/` 目录
   - 查看认证配置 (`src/app/api/auth/`)
   - 理解路由守卫 (`src/middleware.ts`)

4. **准备 Phase 2**
   - 讨论分工
   - 规划用户管理和项目管理模块

---

**祝你编码愉快！** 🚀

有任何问题，请参考文档或检查计划文件。
