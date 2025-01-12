# ============ Stage 1: Build React App ============
FROM node:16-alpine AS react_builder

WORKDIR /app

# Copy frontend files into the builder
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# ============ Stage 2: Final Nginx Image ============
FROM nginx:alpine

# Remove default config, then copy our custom Nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

# Copy the React build output from the previous stage
COPY --from=react_builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
