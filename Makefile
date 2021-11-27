watch:
	yarn watch
docker-start:
	docker-compose -f docker-compose.yml up 
docker-build:
	docker-compose up --build
docker-stop:
	docker-compose stop
docker-down:
	docker-compose down