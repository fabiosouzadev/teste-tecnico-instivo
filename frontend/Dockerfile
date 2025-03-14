# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Cache de dependências
COPY package*.json ./
RUN npm ci --quiet

# Build da aplicação
COPY . .
RUN npm run build && \
    npm prune --production

# Imagem final
FROM node:18-alpine

WORKDIR /app

# Configuração de segurança
RUN apk add --no-cache tini && \
    addgroup -S app && \
    adduser -S app -G app && \
    chown -R app:app /app
USER app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
