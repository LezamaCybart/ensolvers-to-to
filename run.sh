# db credentials
echo 'please input a database name'
read DATABASENAME;
echo 'please input a user name for the database'
read USRDB;
echo 'please input a password for the user'
read PASSWDDB;

export DBNAME=$DATABASENAME
export DBUSER=$USRDB
export DBPASSWORD=$PASSWDDB

# backend
cd ./todo-backend
mvn spring-boot:run &

# frontend
cd ../todo-frontend
npm ci
npm start

