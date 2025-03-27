FROM node:18-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

FROM node:18-alpine AS prod

WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
CMD ["node", "server.js"]
