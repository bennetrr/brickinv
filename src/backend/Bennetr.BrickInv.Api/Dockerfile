FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime-base
WORKDIR /app
EXPOSE 80


FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build-base
ARG DOTNET_TARGET_ARCH
ARG DOTNET_EF_TARGET_ARCH

WORKDIR /src
COPY "Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj" "Bennetr.BrickInv.Api/"
COPY "Bennetr.RebrickableDotNet/Bennetr.RebrickableDotNet.csproj" "Bennetr.RebrickableDotNet/"
RUN dotnet restore -a $DOTNET_TARGET_ARCH "Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj"

COPY . .
WORKDIR "/src/Bennetr.BrickInv.Api"


FROM build-base as build-app
RUN dotnet build -a $DOTNET_TARGET_ARCH "Bennetr.BrickInv.Api.csproj" -c Release -o /app/build


FROM build-app AS publish-app
RUN dotnet publish -a $DOTNET_TARGET_ARCH "Bennetr.BrickInv.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false


FROM build-base as build-migration
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN dotnet tool install --global dotnet-ef

RUN dotnet build --runtime $DOTNET_EF_TARGET_ARCH "Bennetr.BrickInv.Api.csproj" -c Debug

RUN dotnet ef migrations bundle --no-build --target-runtime $DOTNET_EF_TARGET_ARCH --context IdentityContext -o /app/migrations/identity-db-migration
RUN dotnet ef migrations bundle --no-build --target-runtime $DOTNET_EF_TARGET_ARCH --context BrickInvContext -o /app/migrations/brickinv-db-migration


FROM runtime-base AS final
WORKDIR /app
COPY --from=publish-app /app/publish .
COPY --from=build-migration /app/migrations .
ENTRYPOINT ["dotnet", "Bennetr.BrickInv.Api.dll"]
