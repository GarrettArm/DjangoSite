

The site is containerized: one docker for gunicorn+webapp, one for nginx, one for postgres. Plus a couple of volumes for non-ephemeral data.  To run them:

  - ./build.sh
  - app is at localhost or 127.0.0.1

To stop:

  - docker-compose down

Rebuilding app server (i.e., after editing code):

  - ./wipe_volumes.sh

A sample database dump can be placed in folder /sample_data, which will be ingested into postgres if there is an empty postgres_data volume.  To create a sample database dump, create the data using the webapp then dump it:

 - docker-compose exec db pg_dump -U postgres postgres > ./sample_data/sample_db.sql

[[ The following are old instructions that might still have a kernel of truth, these are baked into mysite_project/site_core/Dockerfile ]]


There are two settings files:  development & production.

    specify the settings when running python manage, E.g., 

        '--settings=site_core.settings.production' or 
        '--settings=site_core.settings.development'
