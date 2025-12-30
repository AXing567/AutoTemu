# AutoTemu

FastAPI 后端 + Next.js 前端的全栈管理系统。

## 快速开始

### 前置要求
- Docker Desktop
- Node.js 18+

### 启动

```bash
# 项目根目录启动后端和数据库
docker compose -f docker-compose.dev.yml up

# 另一个终端启动前端
cd frontend
pnpm install
pnpm dev
```

访问：
- 前端: http://localhost:3000
- 后端 API: http://localhost:8000
- API 文档: http://localhost:8000/docs

## 技术栈

### 后端 ([Full Stack FastAPI Template](https://github.com/fastapi/full-stack-fastapi-template))
- FastAPI + SQLModel + PostgreSQL
- JWT 认证
- Docker Compose 部署

### 前端 (AI 编写)
- Next.js 15 + TypeScript
- Shadcn/UI + Tailwind CSS
- TanStack Query (React Query)
- React Hook Form + Zod
- next-auth v5

## 项目结构
```
├── backend/      # FastAPI 后端
├── frontend/     # Next.js 前端
├── docker-compose.yml
└── .env
```

## 开发

**前端**: `cd frontend && pnpm dev`
**后端**: 参见 `backend/README.md`
