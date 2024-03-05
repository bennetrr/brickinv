FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG DOTNET_TARGET_ARCH

WORKDIR /src
COPY "Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj" "Bennetr.BrickInv.Api/"
COPY "Bennetr.RebrickableDotNet/Bennetr.RebrickableDotNet.csproj" "Bennetr.RebrickableDotNet/"
RUN dotnet restore -a $DOTNET_TARGET_ARCH "Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj"

COPY . .
WORKDIR "/src/Bennetr.BrickInv.Api"
RUN dotnet build -a $DOTNET_TARGET_ARCH "Bennetr.BrickInv.Api.csproj" -c Release -o /app/build

RUN dotnet ef migrations bundle --no-build --runtime linux-$DOTNET_TARGET_ARCH --context IdentityContext -o /app/migrations/identity-db-migration
RUN dotnet ef migrations bundle --no-build --runtime linux-$DOTNET_TARGET_ARCH --context BrickInvContext -o /app/migrations/brickinv-db-migration

FROM build AS publish
RUN dotnet publish -a $DOTNET_TARGET_ARCH "Bennetr.BrickInv.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=publish /app/migrations .
ENTRYPOINT ["dotnet", "Bennetr.BrickInv.Api.dll"]
