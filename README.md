pra rodar:

dotnet build

./run-patrimonio.sh

/////////////////////////////////

pra rodar outra vez sem conflito:

pkill -9 dotnet

pkill -9 node

sudo fuser -k 5226/tcp 5173/tcp 2>/dev/null

dotnet clean

dotnet build

./run-patrimonio.sh

