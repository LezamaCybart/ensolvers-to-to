# db credentials
echo 'please input a database name'
read DATABASENAME;
echo 'please input a user name for the database'
read USRDB;
echo 'please input a password for the user'
read PASSWDDB;

echo "Please enter root user MySQL password!"
echo "Note: password will be hidden when typing"
read -s ROOTPASSWORD

# db setup
mysql -uroot -p${ROOTPASSWORD} -e "CREATE DATABASE ${DATABASENAME} /*\!40100 DEFAULT CHARACTER SET utf8 /;"
mysql -uroot -p${ROOTPASSWORD} -e "CREATE USER ${USRDB}@localhost IDENTIFIED BY '${PASSWDDB}';"
mysql -uroot -p${ROOTPASSWORD} -e "GRANT ALL PRIVILEGES ON ${DATABASENAME}.* TO '${USRDB}'@'localhost';"
mysql -uroot -p${ROOTPASSWORD} -e "FLUSH PRIVILEGES;"


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

