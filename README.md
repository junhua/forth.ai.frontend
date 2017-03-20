# forth.ai.frontend

> react, react-redux, react-router.

## File Structure
``` bash
.
├── dist
├── src                          # source code
│   ├── app                      # Root Component, Router Config
│   ├── components               # Reusable Component, Presentational Component
│   ├── containers               # (actions, constant, reducer), Container Component
│   ├── images
│   ├── index.jsx                # entry
│   ├── reducers                 # Combine Reducers
│   ├── shard.scss
│   ├── static                   # static assets
│   ├── store                    # Create Store (Single State Management)
│   ├── styles                   # all styles
│   ├── utils                    # Helper functions
│   └── views                    # Set of Single Page
├── index.template.html
├── index.template.prod.html
├── webpack.config.js
├── webpack.config.prod.js
├── Dockerfile
├── Dockerfile.prod
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

## Build Setup

Prerequisites: [Node.js](https://nodejs.org/en/) (6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

```bash
# install dependencies
npm install && npm install local-web-server --global

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build

# Running it on production
ws -d dist -s index.html -p 8080
```

## Docker

```bash
# Running it on production
docker-compose --file docker-compose.prod.yml build
docker-compose --file docker-compose.prod.yml up -d
```