# Stage 1: Build stage
FROM node:18-alpine AS build

# Install dependencies and Bun
RUN apk add --no-cache curl bash \
  && curl -fsSL https://bun.sh/install | bash

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application
COPY . .

# Build the Qwik project
RUN bun build

# Stage 2: Production stage
FROM node:18-alpine

# Install Bun
RUN apk add --no-cache curl bash \
  && curl -fsSL https://bun.sh/install | bash

# Set working directory
WORKDIR /app

# Copy only the necessary files (dependencies and build output)
COPY --from=build /app/package.json /app/bun.lockb ./
COPY --from=build /app/dist /app/dist

# Expose the port (adjust if necessary)
EXPOSE 3000

# Run the Qwik project using Bun
CMD ["bun", "start"]
