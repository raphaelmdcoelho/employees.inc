# Stage 1: Build Angular app
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional

COPY . .
RUN npm run build --configuration --production

# Stage 2: Setup Nginx.
FROM nginx:1.21
COPY --from=build /app/dist/employee-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
