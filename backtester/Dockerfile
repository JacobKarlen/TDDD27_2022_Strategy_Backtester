FROM python:3.8

# Create the app directory
WORKDIR /usr/src/app

COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

# Bundle application source
COPY ./src .

EXPOSE 8000

CMD [ "uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000", "--reload"]
