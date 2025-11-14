FROM node:18-alpine
WORKDIR /app
COPY back/package.json /app/back/package.json
COPY back/package-lock.json /app/back/package-lock.json
WORKDIR /app/back
RUN npm ci || npm install
COPY back /app/back
ENV NODE_ENV=production
CMD ["npm","start"]