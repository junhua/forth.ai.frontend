# forth.ai.frontend

## localhost 

* Prerequisite
```bash
npm install
npm install local-web-server --global
```

* Running in development mode
```bash
npm start
```

* Compiling for production
```bash
npm run build
```

* Running it on production
```bash
ws -d dist -s index.html -p 8080
```

## Docker

* Running it on production
```bash
docker-compose --file docker-compose.prod.yml build
docker-compose --file docker-compose.prod.yml up -d
```
