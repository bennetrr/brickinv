FROM node:16-alpine AS builder

WORKDIR /app/
COPY . ./

RUN yarn install
RUN yarn build

FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html/
