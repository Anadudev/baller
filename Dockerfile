# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the TypeScript source code
COPY . .

# Compile TypeScript code
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./

# Generate Prisma client (ensure it's done in the final image)
RUN npx prisma generate
# Run database migrations
RUN npx prisma migrate deploy --schema=./prisma/schema.prisma
# Expose the port your Express app listens on
EXPOSE 3000

# Command to run your application
CMD ["node", "dist/app.js"]