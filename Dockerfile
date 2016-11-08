FROM nodesource/node:4
MAINTAINER ipland <ipland630@gmail.com>

RUN rm /etc/apt/sources.list \
  \
  # APT Exchange Source
  && echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib" > /etc/apt/sources.list \
  && echo "deb http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" >> /etc/apt/sources.list \
  && echo "deb-src http://mirrors.aliyun.com/debian/ jessie main non-free contrib" >> /etc/apt/sources.list \
  && echo "deb-src http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib" >> /etc/apt/sources.list

RUN apt-get -y update \
  \
  # delete all the apt list files since they're big and get stale quickly
  && rm -rf /var/lib/apt/lists/*

# explicitly set user/group IDs
RUN groupadd -r nodejs --gid=999 && useradd -m -r -g nodejs --uid=999 nodejs

ENV NODE_ENV production

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

# cache package.json and node_modules to speed up builds
COPY package.json .
RUN npm install --production --registry=https://registry.npm.taobao.org \
    && npm install local-web-server -g --registry=https://registry.npm.taobao.org \
    && npm cache clean \
    && npm cache clean -g

# Add your source files
COPY . .

RUN chown -R nodejs:nodejs /home/nodejs/app

# For main web interface
EXPOSE 8080

USER nodejs

CMD ["ws", "-d", "dist", "-s", "index.html", "-p", "8080"]