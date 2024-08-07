FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . ./

CMD ["npm", "run", "build"]



FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server/src/index.js"]
