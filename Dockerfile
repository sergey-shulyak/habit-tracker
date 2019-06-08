# Fetch dependencies
FROM node:12-alpine AS base
WORKDIR /app
COPY . .
RUN yarn --prod --frozen-lockfile

# Fetch devDependencies and test
FROM base as test
RUN yarn --frozen-lockfile \
    && yarn lint \
    && yarn test:ci

# Build
FROM test as build
RUN yarn build

# Run
FROM node:12-alpine as runner
WORKDIR /app
COPY --from=base /app/node_modules node_modules
COPY --from=build /app/dist dist
RUN echo "In container: " && ls
EXPOSE $PORT
CMD ["node", "dist/main.js"]
