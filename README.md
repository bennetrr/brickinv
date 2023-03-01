# Lego App

A web application that helps to check if all parts of Lego sets are present.

## Run the app

You can use docker compose to deploy this app. The `docker-compose.yml` is found in the repository root.

The file exposes the API and its dashboard (PocketBase) on port `8200` and the web app itself on port `8201`.

To update the app to a newer version, you have to update the docker images in the compose file
(or download the new compose file from the GitHub repository).
