# Greenhouse

## Development

### To run the database:

- Ensure Docker is running
- Ensure `pipenv` is installed
- Start `pipenv`:
```
$ pipenv shell
```
- Run the following command in the `server` directory, with `pipenv` running:
```
$ docker-compose up
```

### To run the service:

- Ensure the database is running
- Run the following commands in the `server` directory:
```
$ export MONGO_URL=mongodb://mongo_user:mongo_secret@0.0.0.0:27017/

$ FLASK_APP=$PWD/http/api/endpoints.py FLASK_ENV=development pipenv run python -m flask run --port 4433
```

### To run the app:

- Ensure the Greenhouse data server is running locally on port 8080
- Run the following commands in the `greenhouse-ui` directory:
```
$ npm install
$ npm start
```
- The app should now be running at `http://localhost:3000/`
