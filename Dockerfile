FROM python:3.8-alpine


RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev && \
    apk add postgresql-dev


RUN pip3 install psycopg2

COPY ./foji_project/requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install --trusted-host pypi.python.org -r requirements.txt


EXPOSE 8000

ENV DJANGO_SETTINGS_MODULE foji_project.settings_docker
ENV PYTHONUNBUFFERED 0

COPY . /app 
WORKDIR /app/foji_project

CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:8000", "foji_project.wsgi"]
