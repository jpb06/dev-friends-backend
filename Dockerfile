# base node image
FROM node:20-bullseye-slim as base

# Install dependencies
RUN apt-get update && apt-get install -y openssl make g++ gcc python3
RUN npm --silent install --global --depth 0 pnpm

# set for base and all that inherit from it
ENV NODE_ENV=production

# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir /app
WORKDIR /app

ADD ./package.json ./pnpm-lock.yaml ./
RUN pnpm i --prod=false

# Build the app
FROM base as build

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD . .

RUN pnpm build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/node_modules/.pnpm /app/node_modules/.pnpm
COPY --from=build /app/dist /app/dist
ADD . .

CMD ["pnpm", "start"]
