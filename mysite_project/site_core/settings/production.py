import os

from .base import *


DEBUG = False

SECRET_KEY = os.environ["PROD_SECRET_KEY"]

ALLOWED_HOSTS = ["*", "18.188.30.182", "gaularmstrong.com", "www.gaularmstrong.com"]

INTERNAL_IPS = ["127.0.0.1"]

STATIC_ROOT = "/var/www/django/static"

MEDIA_ROOT = "/var/www/django/media"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "postgres",
        "USER": "postgres",
        "HOST": "db",
        "PORT": 5432,
    }
}
