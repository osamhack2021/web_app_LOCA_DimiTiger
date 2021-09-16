FROM mhart/alpine-node:14 AS base
ENV WORKDIR=/usr/src/app
WORKDIR $WORKDIR

COPY package.json ./
COPY yarn.lock ./

RUN yarn
# install --production --frozen-lockfile --non-interactive

FROM base AS release

COPY . .

EXPOSE 80
CMD ["yarn", "start"]