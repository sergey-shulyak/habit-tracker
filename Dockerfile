# Build
FROM node:12-alpine AS base

WORKDIR /app

# COPY package.json yarn.lock ./
# COPY src/ ./src
COPY . .

RUN ls && yarn --prod --frozen-lockfile
# RUN npm ci \
    # && npm run lint \
    # && npm run test:ci \
    # && npm run build


# RUN yarn install --frozen-lockfile \
    # && yarn lint \
    # && yarn test:ci \
    # && yarn build

FROM base as test

RUN yarn --frozen-lockfile \
    && yarn lint \
    && yarn test:ci


FROM test as build

RUN yarn build


FROM node:12-alpine as runner

WORKDIR /app

COPY --from=base /app/node_modules node_modules
COPY --from=build /app/dist dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
