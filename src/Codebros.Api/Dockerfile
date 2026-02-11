FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "src/Codebros.Api/Codebros.Api.csproj"
RUN dotnet publish "src/Codebros.Api/Codebros.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
# Força a API a ouvir na porta 8080 dentro do container
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Codebros.Api.dll"]