FROM node:20 AS builder
ARG SPRINGBOOT_ADDRESS=192.168.35.177
ARG SPRINGBOOT_PORT=9090
ENV VITE_REST_API_HOST=192.168.35.177
ENV VITE_REST_API_PORT=9090
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build
    
FROM nginx
WORKDIR /app
COPY --from=builder /app/dist /usr/share/nginx/html
