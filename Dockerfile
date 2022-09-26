# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*"]
RUN npm install 
COPY . .
COPY PAGES ./pages
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]