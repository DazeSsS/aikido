FROM python:3.11-slim-bookworm

WORKDIR /app

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY ./src ./src

EXPOSE 8000
