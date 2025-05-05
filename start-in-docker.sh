docker build -t prisma-express-app .
docker run -p 3000:3000 --name prisma-app prisma-express-app
docker-compose up -d