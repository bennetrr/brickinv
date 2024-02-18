# BrickInv

A web application that helps to check if all parts of a LEGO set are present.

## TODOs

### Backend

- Implement file storage for user and group images
- Remove code duplication (CQRS?)
- Write endpoint documentation
- Improve prod and dev setup
  - Document exposed ports, environment variables and config files
  - Add easy way to run migrations

### Frontend

- [ ] Loading, success and error indicators
- [ ] Error handling and logging
- [ ] Test for and fix small errors
- [ ] Customize theme
- [ ] Move components into own files

### Fragen

- Wie funktioniert die ErrorHandlerMiddleware?
- ReactBase: Vererbung von styles ([Button.tsx](https://github.com/bennetrr/brickinv/blob/e123a12d34da3aa5fe2d34513cdcb9a41176ac8c/src/frontend/src/ui/atoms/button/Button.tsx#L94-L94))
- Generell: Feedback zum Code

## Development

### Dependencies

- `dotnet-sdk@8`
- `node@21`
- `pnpm`

### Install dependencies

In `src/frontend`:

```bash
pnpm install
```

In `src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api`

```bash
dotnet restore
```

### Run development server with local API

In repository root:

```bash
docker run -d \
  --name brickinv-mariadb-dev \
  --publish 3306:3306 \
  --env 'MARIADB_ROOT_PASSWORD=3gEju5UGRPbSbJ$r#wvYDn$g%6ryH5' \
  --volume brickinv-mariadb-dev:/var/lib/mysql \
  --volume ./setup.sql:/docker-entrypoint-initdb.d/setup.sql \
  mariadb:11.2.2-jammy
```

> [!NOTE]
> If you change the password or the port in the command above, you need to update the `appsettings.Development.json`
> file!

In `src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api`

```bash
dotnet run --launch-profile http
```

In `src/frontend`:

Copy `public/env/env.template.js` to `public/env/env.local.js` and replace `{{ apiBaseUrl }}`
with `http://localhost:5105` (or the URL of your local API).

Then run:

```bash
pnpm dev:local
```

### Run development server with production API

In `src/frontend`:

Copy `public/env/env.template.js` to `public/env/env.prod.js` and replace `{{ apiBaseUrl }}` with the URL of your
production API.

Then run:

```bash
pnpm dev:prod
```

## Production

### Run the production build

Download the following files:

- `docker-compose.yml`
- `setup.sql`
- `src/frontend/public/env/env.template.js`

Rename `env.template.js` to `env.js` and replace `{{ apiBaseUrl }}` with the URL of your production API.

Then start the containers by running:

```bash
docker compose up -d
```

Frontend and backend will be exposed into the `reverse_proxy` network.
The data is saved in the named volume `brickinv_mariadb`.

## Resources

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio
- https://learn.microsoft.com/en-us/aspnet/identity/overview/getting-started/introduction-to-aspnet-identity
- https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-8.0
- https://github.com/wemogy/libs-infrastructure-database
- https://github.com/wemogy/libs-cqrs
- https://github.com/wemogy/libs-aspnet

- https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-8.0&tabs=visual-studio

