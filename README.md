# BrickInv

A web application that helps to check if all parts of a LEGO set are present.

## Configuration

### Frontend

The frontend is configurable with the `env.js` file.

> [!CAUTION]
> The contents of this file are available in `window.env` in the browser,
> so don't store any confidential information in there.

| Name                  | Type     | Description                                                                              |
|-----------------------|----------|------------------------------------------------------------------------------------------|
| `apiBaseUrl`          | `string` | Base URL of the BrickInv API, e.g. `https://api.brickinv.com` or `http://localhost:4003` |
| `clerkPublishableKey` | `string` | Publishable key of the Clerk application                                                 |

### Backend

The backend is configurable with everything supported by ASP.NET.
For development, the .NET user secret manager is recommended, for production a `.env` file.

| Name                            | Type      | Description                                                                                                          |
|---------------------------------|-----------|----------------------------------------------------------------------------------------------------------------------|
| `Authentication:ClerkSecretKey` | `string`  | Secret key of the Clerk application                                                                                  |
| `Authentication:Authority`      | `string`  | Instance URL of the Clerk application                                                                                |
| `Authentication:AppBaseUrl`     | `string`  | Base URL of the BrickInv App, e.g. `https://brickinv.com` or `http://localhost:4004`                                 |
| `ConnectionStrings:Db`          | `string`  | Connection string for main database, e.g. `Server=localhost;Port=4001;User=root;Password=brickinv;Database=brickinv` |
| `ConnectionStrings:Redis`       | `string`  | Connection string for Redis cache, e.g. `localhost:4002`                                                             |
| `Rebrickable:ApiKey`            | `string`  | API key for Rebrickable, used for retrieving information about Lego sets                                             |
| `Telemetry:SentryDsn`           | `string?` | DSN (Data Source Name) of the Sentry project. If omitted, telemetry is disabled                                      |

## Development

### Dependencies

- `dotnet-sdk@8`
- `node@22`
- `pnpm`
- `docker`

### Setup

Install frontend dependencies:

```bash
# working directory: src/frontend
pnpm install
```

Install backend dependencies:

```bash
# working directory: src/backend/Bennetr.BrickInv.Api
dotnet restore
```

### Creating migrations

If any changes where made to the database models, a migration script needs to be created.
The migration only needs to be created for the context that holds the changed models.

```bash
# working directory: src/backend/Bennetr.BrickInv.Api
dotnet ef migrations add {{NAME}} -c BrickInvContext -o ./Migrations/BrickInv
```

### Run development server against local API

Start database and cache:

```bash
# working directory: repository root
docker run -d \
  --name brickinv-dev-mariadb \
  --publish 4001:3306 \
  --env 'MARIADB_ROOT_PASSWORD=brickinv' \
  --volume brickinv-mariadb-dev:/var/lib/mysql \
  --volume ./setup.sql:/docker-entrypoint-initdb.d/setup.sql \
  mariadb:11.6.2

docker run -d \
  --name brickinv-dev-redis \
  --publish 4002:6379 \
  redis:7.4.1-alpine
```

To configure the backend, use
the [.NET User Secret Manager](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows#secret-manager)
with the options from the [Configuration](#backend) section.

Before starting the backend, you need to run the database migration scripts:

```bash
# working directory: src/backend/Bennetr.BrickInv.Api
dotnet ef database update --context BrickInvContext
```

Then, start the backend:

```bash
# working directory: src/backend/Bennetr.BrickInv.Api
dotnet run --launch-profile http
```

The backend is exposed at `http://localhost:4003`

To configure the frontend, copy `src/frontend/public/env/env.template.js` to `src/frontend/public/env/env.local.js` and
replace the empty strings with your own values.
The configuration fields are documented in the [Configuration](#frontend) section.

To start the frontend, run:

```bash
# working directory: src/frontend
pnpm dev:local
```

To stop the database and cache containers and delete its data, run:

```bash
docker stop brickinv-dev-mariadb brickinv-dev-redis
docker rm -v brickinv-mariadb-dev brickinv-dev-redis
```

### Run development server against development API

To configure the frontend, copy `src/frontend/public/env/env.template.js` to `src/frontend/public/env/env.dev.js` and
replace the empty strings with your own values.
The configuration fields are documented in the [Configuration](#frontend) section.

To start the frontend, run:

```bash
# working directory: src/frontend
pnpm dev:dev
```

## Production

### Setup

Download the following files from the [release branch](https://github.com/bennetrr/brickinv/tree/release):

- `docker-compose.yml`
- `setup.sql`
- `src/frontend/public/env/env.template.js` as `env.js`
- `backend.env`

Replace the container tags in the `docker-compose.yml` file with the latest version.
Replace the empty strings in the `env.js` and `backend.env` files with your own values.
The configuration fields are documented in the [Configuration](#configuration) section.

Then start the containers by running:

```bash
docker compose up -d
```

### Connections

All services are exposed into the `reverse_proxy` network.
The frontend is available under `brickinv-frontend-1:80`, the backend under `brickinv-backend-1:8080`.

The application data is saved in the named volume `brickinv_mariadb`.

### Database migration

After the installation and after updates with database model changes,
the database migration scripts need to be executed to apply the changes to your database.
These scripts are shipped with the container. You can execute them with the following command:

```bash
docker compose exec backend sh -c './brickinv-db-migration'
```
