FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup -S shipnow && adduser -S shipnow -G shipnow
COPY --from=dependencies /app/node_modules ./node_modules
COPY --chown=shipnow:shipnow src ./src
COPY --chown=shipnow:shipnow mocks ./mocks
COPY --chown=shipnow:shipnow package*.json ./
RUN mkdir -p logs uploads && chown -R shipnow:shipnow logs uploads
USER shipnow
EXPOSE 8080
CMD ["npm", "start"]
