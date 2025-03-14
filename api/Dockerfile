# api/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Cache de dependências
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci --quiet

# Build da aplicação
COPY src/ ./src/
RUN npm run build

# Imagem final
FROM node:18-alpine

WORKDIR /app

# Configuração de segurança
RUN apk add --no-cache tini && \
    addgroup -S app && \
    adduser -S app -G app && \
    chown -R app:app /app
USER app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/main.js"]
