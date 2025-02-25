FROM node:20 AS builder
ARG SPRINGBOOT_ADDRESS
ARG SPRINGBOOT_PORT
ENV VITE_REST_API_HOST=${SPRINGBOOT_ADDRESS}
ENV VITE_REST_API_PORT=${SPRINGBOOT_PORT}
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build
    
FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]