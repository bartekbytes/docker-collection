FROM node:18-alpine

COPY package.json ./
RUN npm install --production

COPY index.js ./

ENV BROKERS="kafka:9092"
ENV TOPIC="postgres.cdc.public.customers"

CMD ["node", "index.js"]