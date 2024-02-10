# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

# Build step #2: build the Flask back end
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy the Flask app into the container
WORKDIR /app
COPY --from=build-step /app/build ./build
# COPY api/. /api

RUN mkdir ./api
COPY api/ ./api/
RUN pip install -r ./api/requirements.txt
ENV FLASK_ENV production
ENV FLASK_APP=main.py

EXPOSE 3000

WORKDIR /app/api

# Start the application
CMD ["gunicorn", "--bind", "0.0.0.0:3000", "--timeout", "360", "main:app"]