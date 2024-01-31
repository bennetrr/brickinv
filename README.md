# BrickInv

A web application that helps to check if all parts of a LEGO set are present.

## TODOs

### Backend

- [ ] Error handling and logging
- [ ] Groups and Users
- [ ] Space Blocks Permissions
- [ ] Make use of ErrorHandlerMiddleware
- [ ] Let user choose mariadb password

### Frontend

- [ ] Loading, success and error indicators
- [ ] Error handling and logging
- [ ] Test for and fix small errors
- [ ] Customize theme
- [ ] Move components into own files

### General

- [ ] Ask Sebastian things that I don't understand
- [ ] Ask Sebastian for feedback on code
- [ ] Write documentation and tests (maybe)

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
docker run mariadb:11.2.2-jammy -d \
  --name brickinv-mariadb-dev \
  --expose 3306:3306 \
  --env 'MARIADB_ROOT_PASSWORD=3gEju5UGRPbSbJ$r#wvYDn$g%6ryH5' \
  --volume brickinv-mariadb-dev:/var/lib/mysql \
  --volume ./setup.sql:/docker-entrypoint-initdb.d/setup.sql
```

> [!NOTE]
> If you change the password or the port in the command above, you need to update the `appsettings.Development.json` file!

In `src/backend/Bennetr.BrickInv.Api/Bennetr.BrickInv.Api`

```bash
dotnet run --launch-profile http
```

In `src/frontend`:

Copy `public/env/env.template.js` to `public/env/env.local.js` and replace `{{ apiBaseUrl }}` with `http://localhost:5105` (or the URL of your local API).

Then run:

```bash
pnpm dev:local
```

### Run development server with production API

In `src/frontend`:

Copy `public/env/env.template.js` to `public/env/env.prod.js` and replace `{{ apiBaseUrl }}` with the URL of your production API.

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
