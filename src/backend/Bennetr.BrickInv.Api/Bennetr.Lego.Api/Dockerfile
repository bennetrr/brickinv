FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Bennetr.Lego.Api/Bennetr.Lego.Api.csproj", "Bennetr.Lego.Api/"]
RUN dotnet restore "Bennetr.Lego.Api/Bennetr.Lego.Api.csproj"
COPY . .
WORKDIR "/src/Bennetr.Lego.Api"
RUN dotnet build "Bennetr.Lego.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Bennetr.Lego.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bennetr.Lego.Api.dll"]
