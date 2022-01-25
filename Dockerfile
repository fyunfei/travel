FROM node
RUN mkdir -p /app
COPY /.nuxt /app/.nuxt
COPY /static /app/static
COPY nuxt.config.js /app/
COPY package.json /app/
COPY package-lock.json /app/
WORKDIR /app
EXPOSE 9610
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install --production
CMD ["npm", "start"]