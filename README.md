# expressjs-typescript-orm-sequelize
simple expressjs typescript with orm sequelize

## How To run

### copy environment variable

```sh
cp .env-sample .env
```

### run manualy

* via yarn or npm :

```sh
# install package
npm install or yarn install

#  running app with build
npm run dev or yarn dev

#  running app watch mode for local
npm run watch or yarn watch
```

* via make :

```sh
# start aplication with docker
make docker-start 

# stop docker container
make docker-stop 

# remove docker container
make docker-down 
```

### fill in the copied environment earlier

```sh
#NODEJS
APP_PORT=8000
NODE_ENV=development

#DB
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_DATABASE=
DB_DRIVER='postgres'
DB_HOST=
DB_NAME=
```

### run with docker-compose

```sh
docker-compose up --build
```

### or run with background process

```sh
docker-compose up --build -d
```
### execution npm with container docker
```sh
# install package
docker-compose exec express-typescript-dot npm install
```