The site is containerized: one docker for gunicorn+webapp, one for nginx, one for postgres. Plus a couple of volumes for non-ephemeral data.

To run them:

  - create a file ./DjangoSite/.env with contents:
  ```
  PROD_SECRET_KEY=CHANGEME
  POSTGRES_HOST=db
  POSTGRES_PORT=5432
  POSTGRES_DB=djangosite
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=CHANGEME
  ```

  ```
  docker-compose up
  docker-compose run webapp python3 manage.py makemigrations contact polls etextbook milage ajax_polls shwagswap --settings=site_core.settings.development
  docker-compose run webapp python3 manage.py migrate --settings=site_core.settings.development
  docker-compose run webapp python3 manage.py createsuperuser --settings=site_core.settings.development
  docker-compose run webapp python3 manage.py collectstatic --settings=site_core.settings.development
  ```
  
  - the site should load at localhost:8000

To stop:

  - docker-compose down

Rebuilding app server (i.e., after editing code):

  - ./wipe_volumes.sh


## Preserving the db data

The volume "djangosite_postgres_data" persists the postgres data between container restarts.  However, I like to blow up the db on each restart, and thus included the line "docker volume rm djangosite_postgres_data" in my quick reset script, "full_refresh.sh"

You may prefer to remove that line from full_refresh.sh.  In that case, the pg data will persist from rebuild to rebuild.  You could stop reading here.

But if you also want to blow your db on each restart, then make a sqldump anytime your db gets to a good place.

```bash
docker-compose exec db pg_dump -U postgres postgres > ./db_autoimport/db.sql
```

Any sqldump found in db_autoimport will be autoimported into the pg container on next container start, if there is no djangosite_postgres_data volume.

Removing the djangosite_postgres_data volume is therefore the switch.  If the volume is present, pg uses the previous run's db data.  If it's absent, pg creates a new db using the sqldump data.

(The third case:  no volume & no sqldump gets a default db.  Django's migrate tool creates a sensible default db based on the app's models files.)

## Production versus development settings

This box is set to use the dev settings.  site_core/wsgi.py has a line with `--settings=site_core.settings.development`.  

The dev settings add a dev toolbar module.

But if you want to see what the prod site looks like (or you're running this on production), then change that line to `--settings=site_core.settings.production`.

Also, you'll note all the commands (including "full_refresh.sh") would need to be changed to match.