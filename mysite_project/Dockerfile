FROM amd64/python:3.10

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /code/requirements.txt
WORKDIR /code/
RUN pip install -U pip
RUN pip install -r requirements.txt
COPY . /code/
