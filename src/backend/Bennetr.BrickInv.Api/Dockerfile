FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN echo $BUILDPLATFORM $TARGETPLATFORM; exit 1
WORKDIR /src
COPY ["Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj", "Bennetr.BrickInv.Api/"]
COPY ["Bennetr.RebrickableDotNet/Bennetr.RebrickableDotNet.csproj", "Bennetr.RebrickableDotNet/"]

RUN dotnet restore -a $TARGETPLATFORM "Bennetr.BrickInv.Api/Bennetr.BrickInv.Api.csproj"
COPY . .
WORKDIR "/src/Bennetr.BrickInv.Api"
RUN dotnet build -a $TARGETPLATFORM "Bennetr.BrickInv.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -a $TARGETPLATFORM "Bennetr.BrickInv.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bennetr.BrickInv.Api.dll"]
