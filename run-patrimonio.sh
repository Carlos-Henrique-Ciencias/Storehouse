#!/bin/bash
echo "Subindo Patrimônio Câmara de Ourolândia..."
sudo fuser -k 5226/tcp 5173/tcp 2>/dev/null
dotnet watch run --project src/Codebros.Api & 
cd ui && npm run dev &
wait
