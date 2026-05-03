FROM node:20-alpine AS builder

WORKDIR /app

ARG EXPO_PUBLIC_API_URL=/api
ENV EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL}
ENV CI=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx expo export --platform web


FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
