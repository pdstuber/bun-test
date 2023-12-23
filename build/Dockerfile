FROM oven/bun as base
WORKDIR /app

FROM base AS install
ADD package.json .
ADD bun.lockb .
RUN bun install --frozen-lockfile --production

FROM base AS build
COPY --from=install /app/node_modules /app/node_modules
COPY . .

ENV NODE_ENV=production
RUN bun test
RUN bun run build

FROM oven/bun:distroless

COPY --from=build /app/application /app/application
COPY --from=base /etc/passwd /etc/passwd

USER bun

EXPOSE 3000/tcp
ENTRYPOINT ["/app/application"]
