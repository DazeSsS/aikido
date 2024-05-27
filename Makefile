rebuild: build down up

build:
	docker-compose build

build_nocache:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

restart:
	docker-compose restart

prune:
	docker system prune

makemigrations:
	python backend/src/manage.py makemigrations

createsuperuser:
	docker-compose run --rm api bash -c "python src/manage.py createsuperuser"

populate:
	docker-compose run --rm api bash -c "python src/manage.py populate_db"

flush:
	docker-compose run --rm api bash -c "python src/manage.py flush"
