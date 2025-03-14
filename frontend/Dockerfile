FROM node:18-alpine AS builder

WORKDIR /app

# Cache de dependências
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --quiet

# Copiar arquivos e construir
COPY . .
RUN npm run build && \
    npm prune --production

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Configuração de segurança
RUN apk add --no-cache tini && \
    addgroup -S app && \
    adduser -S app -G app && \
    chown -R app:app /app
USER app

# Copiar arquivos necessários
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE ${PORT}

# Iniciar aplicação
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
