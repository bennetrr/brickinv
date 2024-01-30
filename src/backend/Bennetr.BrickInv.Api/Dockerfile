FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj", "Bennetr.BrickInv.Api/"]
COPY ["Bennetr.RebrickableDotNet/Bennetr.RebrickableDotNet.csproj", "Bennetr.RebrickableDotNet/"]

RUN dotnet restore "Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj"
COPY . .
WORKDIR "/src/Bennetr.BrickInv.Api"
RUN dotnet build "Bennetr.BrickInv.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Bennetr.BrickInv.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bennetr.BrickInv.Api.dll"]
