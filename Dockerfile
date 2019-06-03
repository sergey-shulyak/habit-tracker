# Build
FROM node:12-alpine AS builder

WORKDIR /home/node/app

COPY . .

ENV SNYK_TOKEN=$SNYK_TOKEN

RUN echo "Snyk token: ${SNYK_TOKEN}"

RUN npm i -g yarn && \
    yarn install --frozen-lockfile && \
    yarn build

# Run
FROM node:12-alpine

ENV NODE_ENV=production
WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["yarn", "start:prod"]