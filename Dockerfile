ARG PNPM_VERSION=9.7.0

# 第一阶段 - 基础镜像 - 避免镜像层重复
FROM node:22-alpine AS base
# 工作目录
WORKDIR /app
# 设置镜像源
RUN npm config set registry https://registry.npmmirror.com/
# 安装 pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}


# 第二阶段 - 当前依赖文件改变时重新构建(作缓存避免重复下载依赖)
FROM base AS deps
# 缓存依赖文件
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile


# 第三阶段 - 打包构建
FROM deps AS build
COPY . .
RUN pnpm run build


# 第四阶段 - 最终执行
FROM base AS final
ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .

EXPOSE 80

# Run the application.
CMD pnpm run astro
