FROM nodesource/jessie:6.3.1
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

ENV NODE_ENV dev

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

# cache package.json and node_modules to speed up builds
COPY package.json package.json

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install local-web-server node-gyp -g && npm cache clean -g
RUN npm install && npm cache clean

# Add your source files
COPY . .

ARG API_ADDRESS
ENV API_ADDRESS ${API_ADDRESS:-192.168.99.100:8000}

ENV PORT 3000

RUN find /home/nodejs/app -iname 'node_modules' -prune -o -print0 | xargs -0 chown nodejs:nodejs

# For main web interface
EXPOSE 8080 3000

USER nodejs

CMD npm start