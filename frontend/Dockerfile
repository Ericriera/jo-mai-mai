FROM node:20-alpine AS builder

WORKDIR /app

ENV CI=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx expo export --platform web


FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
