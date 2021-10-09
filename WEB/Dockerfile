FROM mhart/alpine-node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache
RUN yarn global add serve

COPY . .
ENV DISABLE_ESLINT_PLUGIN=true
RUN yarn build

EXPOSE 80

CMD ["yarn", "serve"]
