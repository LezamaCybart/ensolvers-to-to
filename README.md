# ensolvers TO-DO APP
fullstack todo app build for a code challenge, using a MySql database, a Spring application as an API that is consumed by a React frontend.

live demo: https://thawing-sierra-05992.herokuapp.com

## Runtimes engines and tools required to run the app
MySQL Ver 8.0.27
Apache Maven 3.6.3
Spring Boot 2.6.0
Node 16.13.0
npm 8.1.0
React 17.0.2

## Running the app
If you just clone the project, you can set up and run the whole app running the set_up_and_run script.
The script will prompt you for ceredentials for the creation of a new database, when the db is ready, it will export the credentials as environment variables to be used next by the Sping application, after the backend is up and running, dependencies for the React app will be installed and the app will run.

```
$ ./set_up_and_run.sh
```


I your already set up the database with the set_up_and_run script or you already set up a database yourself and you want yo run the app without creating a new database, you can do so running the run script. The script will prompt you for credentials of your already existing database and will set up the environment variables.

```
$ ./run.sh
```

Disclaimer:
  *The set_up_and_run script will promtp you for your mysql root password.
  *Killing the app when runned by the scripts, wont shut down the Spring application, you will have to shut it down manually or kill the port.

## User Stories
### Phase 1
- As a user, I want to be able to create, edit and delete to-do items.
- As a user, I want to mark/unmark to-do items as completed.

### Phase 2
- As a user, I want to be able to create and remove new folders. NOTE: removing new folders
will remove all the tasks belonging to it.
- As a user, I want to be able to navigate to the item list inside a folder and manipulate the
items using the same UI implemented in Phase 1

