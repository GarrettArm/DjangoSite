docker-compose down
docker volume rm djangosite_mysite_project djangosite_postgres_data djangosite_static_volume

docker-compose up -d --build
docker-compose run webapp python3 manage.py makemigrations milage blog polls etextbook contact ajax_polls shwagswap --settings=site_core.settings.development
docker-compose run webapp python3 manage.py migrate --settings=site_core.settings.development
docker-compose run webapp python3 manage.py createsuperuser --settings=site_core.settings.development
docker-compose run webapp python3 manage.py collectstatic --settings=site_core.settings.development
