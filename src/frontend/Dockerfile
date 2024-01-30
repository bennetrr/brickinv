FROM node:21-alpine as build
ARG VERDACCIO_USERNAME
ARG VERDACCIO_PASSWORD

# Set up NPM to use Verdaccio
ENV NPM_REGISTRY=https://verdaccio.calmstone-61276c23.westeurope.azurecontainerapps.io
ENV NPM_USER=$VERDACCIO_USERNAME
ENV NPM_PASS=$VERDACCIO_PASSWORD
ENV NPM_EMAIL=it@wemogy.com
ENV NPM_SCOPE=@wemogy

RUN pnpx add -g npm-cli-login

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY . .
RUN pnpm run build

FROM nginx:1.24.0-alpine
COPY ngnix.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
