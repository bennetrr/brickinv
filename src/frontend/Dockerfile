FROM node:21-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set up NPM to use Verdaccio
ARG WEMOGY_NPM_SERVER
ARG WEMOGY_NPM_USER
ARG WEMOGY_NPM_PASSWORD

ENV NPM_REGISTRY=$WEMOGY_NPM_SERVER
ENV NPM_USER=$WEMOGY_NPM_USER
ENV NPM_PASS=$WEMOGY_NPM_PASSWORD
ENV NPM_EMAIL=it@wemogy.com
ENV NPM_SCOPE=@wemogy

RUN pnpx npm-cli-login

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:1.25.3-alpine AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
