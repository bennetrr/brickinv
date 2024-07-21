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
| `apiBaseUrl`          | `string` | Base URL of the BrickInv API, e.g. `https://api.brickinv.com` or `http://localhost:5105` |
| `clerkPublishableKey` | `string` | Publishable Key of the Clerk application                                                 |

### Backend

The backend is configurable with everything supported by ASP.NET.
For development, the .NET user secret manager is recommended, for production a `.env` file.

| `.env`-Name                    | `.json`-Name                  | Type     | Description                                                                          |
|--------------------------------|-------------------------------|----------|--------------------------------------------------------------------------------------|
| `Email__SenderAddress`         | `Email.SenderAddress`         | `string` | Email address that the emails are sent from                                          |
| `Email__SenderName`            | `Email.SenderName`            | `string` | Name that is displayed as email sender                                               |
| `Email__Server`                | `Email.Server`                | `string` | SMTP Server address                                                                  |
| `Email__Port`                  | `Email.Port`                  | `string` | SMTP Server port                                                                     |
| `Email__Username`              | `Email.Username`              | `string` | Username to log in at the SMTP Server                                                |
| `Email__Password`              | `Email.Password`              | `string` | Password to log in at the SMTP Server                                                |
| `AppConfig__RebrickableApiKey` | `AppConfig.RebrickableApiKey` | `string` | API key for Rebrickable, used for retrieving information about Lego sets             |
| `AppConfig__AppBaseUrl`        | `AppConfig.AppBaseUrl`        | `string` | Base URL of the BrickInv App, e.g. `https://brickinv.com` or `http://localhost:5137` |
| `AppConfig__ImprintUrl`        | `AppConfig.ImprintUrl`        | `string` | URL to an imprint, used in emails                                                    |

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
# working directory: src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api
dotnet restore
```

### Creating migrations

If any changes where made to the database models, a migration script needs to be created.
The migration only needs to be created for the context that holds the changed models.
The `{{ NAME }}` placeholder needs to be replaces before running the commands.

```bash
# working directory: src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api
# Create migration for BrickInvContext
dotnet ef migrations add {{ NAME }} -c BrickInvContext -o ./Migrations/BrickInv

# Create migration for IdentityContext
dotnet ef migrations add {{ NAME }} -c IdentityContext -o ./Migrations/Identity
```

### Run development server against local API

Start database:

```bash
# working directory: repository root
docker run -d \
  --name brickinv-mariadb-dev \
  --publish 3306:3306 \
  --env 'MARIADB_ROOT_PASSWORD=3gEju5UGRPbSbJ$r#wvYDn$g%6ryH5' \
  --volume brickinv-mariadb-dev:/var/lib/mysql \
  --volume ./setup.sql:/docker-entrypoint-initdb.d/setup.sql \
  mariadb:11.3.2-jammy
```

> [!NOTE]
> If you change the password or the port in the command above,
> you need to update the `appsettings.Development.json` file!

To configure the backend, use
the [.NET User Secret Manager](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows#secret-manager)
with the options from the [Configuration](#backend) section.

Before starting the backend, you need to run the database migration scripts:

```bash
# working directory: src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api
dotnet ef database update --context BrickInvContext
dotnet ef database update --context IdentityContext
```

Then, start the backend:

```bash
# working directory: src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api
dotnet run --launch-profile http
```

The backend is exposed at `http://localhost:5105`

To configure the frontend, copy `src/frontend/public/env/env.template.js` to `src/frontend/public/env/env.local.js` and
replace the empty strings with your own values.
The configuration fields are documented in the [Configuration](#frontend) section.

To start the frontend, run:

```bash
# working directory: src/frontend
pnpm dev:local
```

To stop the database container and delete its data, run:

```bash
docker stop brickinv-mariadb-dev
docker rm brickinv-mariadb-dev
docker volume rm brickinv-mariadb-dev
```

### Run development server with production API

To configure the frontend, copy `src/frontend/public/env/env.template.js` to `src/frontend/public/env/env.prod.js` and
replace the empty strings with your own values.
The configuration fields are documented in the [Configuration](#frontend) section.

To start the frontend, run:

```bash
# working directory: src/frontend
pnpm dev:prod
```

## Production

### Setup

Download the following files from the [latest release branch](https://github.com/bennetrr/brickinv/tree/release/v2.0):

- `docker-compose.yml`
- `setup.sql`
- `src/frontend/public/env/env.template.js` as `env.js`
- `backend.env`

Replace the empty strings in the `env.js` and `backend.env` files with your own values.
The configuration fields are documented in the [Configuration](#configuration) section.

Then start the containers by running:

```bash
docker compose up -d
```

### Connections

All services are exposed into the `reverse_proxy` network.
The frontend is available under `brickinv-frontend-1:80`, the backend under `brickinv-backend-1:80`.

The application data is saved in the named volume `brickinv_mariadb`.

### Database migration

After the installation and after updates with database model changes,
the database migration scripts need to be executed to apply the changes to your database.
These scripts are shipped with the container. You can execute them with the following command:

```bash
docker compose exec backend sh -c './identity-db-migration && ./brickinv-db-migration'
```
