FROM python:3.7

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /code/requirements.txt
WORKDIR /code/
RUN pip install -U pip
RUN pip install -r requirements.txt
COPY . /code/
