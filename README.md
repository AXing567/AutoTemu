# AutoTemu

FastAPI 后端 + Next.js 前端的全栈管理系统。

## 快速开始

### 前置要求
- Docker Desktop
- Node.js 18+
- Python 3.10+
- Git

### 首次环境初始化

```bash
# 1. 克隆项目
git clone <repo>
cd AutoTemu

# 2. 安装后端依赖（包括 pre-commit）
cd backend
uv sync
cd ..

# 3. 激活虚拟环境
# Windows PowerShell:
.\backend\.venv\Scripts\Activate.ps1

# 4. 注册 Git hooks（用于提交前自动检查代码）
python -m pre_commit install

# 5. 首次检查（可选，查看是否有格式问题）
pre-commit run --all-files

# 如果有代码格式问题，hooks 会自动修复，需要重新 git add 和 commit
```

### 启动项目

```bash
# 终端1：启动后端和数据库
docker compose -f docker-compose.dev.yml up

# 等待输出显示 "Alembic initialized" 和 "Initial data created"

# 终端2：启动前端
cd frontend
pnpm install
pnpm dev

# 终端3（可选）：激活后端虚拟环境进行其他操作
cd backend
.\\.venv\Scripts\Activate.ps1
```

### 访问地址
- 前端: http://localhost:3000
- 后端 API: http://localhost:8000
- API 文档: http://localhost:8000/docs
- 数据库管理（Adminer）: http://localhost:8080
  - Server: db
  - Username: postgres
  - Password: 见 .env 文件中的 POSTGRES_PASSWORD

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

### 前端
```bash
cd frontend
pnpm dev
```

### 后端
```bash
# 后端已通过 Docker 启动
# 如需本地运行，参见 backend/README.md
```

## 数据库连接

### 使用 Navicat / DBeaver 连接
- Host: `localhost`
- Port: `15432` （如果本地已安装 PostgreSQL，使用此端口避免冲突）
- Username: `postgres`
- Password: 见 `.env` 文件中的 `POSTGRES_PASSWORD`
- Database: `app`

### Web 数据库管理
访问 http://localhost:8080 使用 Adminer

## Git 工作流

### 提交前自动检查
项目配置了 pre-commit hooks，在每次提交时自动进行：
- Python 代码格式检查（ruff）
- TypeScript 代码格式检查（biome）
- 其他格式检查（trailing whitespace、文件末尾等）

**工作流程：**
```bash
# 1. 修改代码后正常提交
git add .
git commit -m "feat: add feature"

# 2. 如果检查发现格式问题，hooks 会自动修复
# 你会看到：Fixed by <tool> 的消息

# 3. 重新提交修复后的代码
git add .
git commit -m "feat: add feature"

# 4. 第二次提交应该成功通过
```

**跳过检查（仅在紧急情况）：**
```bash
git commit --no-verify -m "quick fix"
```

### 分支管理
- `main/master` - 生产版本（保护分支）
- `develop` - 开发主分支
- `feature/xxx` - 功能分支
- `fix/xxx` - 修复分支

所有改动通过 PR 合并，需经过 code review 和 CI 检查

## 故障排查

### pre-commit 找不到命令
```bash
# 确保已激活虚拟环境
.\backend\.venv\Scripts\Activate.ps1

# 重新安装
python -m pre_commit install
```

### 前端代码有语法错误
运行 ESLint 检查：
```bash
cd frontend
npm run lint
npm run lint:fix  # 自动修复
```

### 后端代码有格式问题
```bash
cd backend
uv run ruff check --fix
uv run ruff format
```

### Docker 数据库连接失败
```bash
# 检查容器运行状态
docker compose -f docker-compose.dev.yml ps

# 查看数据库日志
docker compose -f docker-compose.dev.yml logs db

# 重启容器
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up
```
