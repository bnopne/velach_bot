echo "INSTALL POSTGRESQL"

add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -sc)-pgdg main"
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update
apt-get install -y postgresql-9.6

sed -i -- "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/9.6/main/postgresql.conf
sed -i -- "s/127.0.0.1\/32/0.0.0.0\/0/g" /etc/postgresql/9.6/main/pg_hba.conf

service postgresql restart

sudo -u postgres psql -c "create user $DB_USER with password '$DB_PASSWORD';"
sudo -u postgres psql -c "create database $DB_NAME;"
sudo -u postgres psql -c "grant all privileges on database $DB_NAME to $DB_USER;"
