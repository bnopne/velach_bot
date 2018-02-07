echo "install software"

curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt-get install -y postgresql build-essential nodejs

echo "replace PostgreSQL config"

cat >/etc/postgresql/9.5/main/postgresql.conf <<EOL
data_directory = '/var/lib/postgresql/9.5/main'		# use data in another directory
hba_file = '/etc/postgresql/9.5/main/pg_hba.conf'	# host-based authentication file
ident_file = '/etc/postgresql/9.5/main/pg_ident.conf'	# ident configuration file
external_pid_file = '/var/run/postgresql/9.5-main.pid'			# write an extra PID file

listen_addresses = '*'
port = 5432
max_connections = 100
unix_socket_directories = '/var/run/postgresql'

ssl = true
ssl_cert_file = '/etc/ssl/certs/ssl-cert-snakeoil.pem'
ssl_key_file = '/etc/ssl/private/ssl-cert-snakeoil.key'

shared_buffers = 128MB
dynamic_shared_memory_type = posix

log_line_prefix = '%t [%p-%l] %q%u@%d '
log_timezone = 'UTC'

stats_temp_directory = '/var/run/postgresql/9.5-main.pg_stat_tmp'

datestyle = 'iso, mdy'
timezone = 'UTC'
lc_messages = 'en_US.UTF-8'
lc_monetary = 'en_US.UTF-8'
lc_numeric = 'en_US.UTF-8'
lc_time = 'en_US.UTF-8'
default_text_search_config = 'pg_catalog.english'

EOL

cat >/etc/postgresql/9.5/main/pg_hba.conf <<EOL
local   all             postgres                                peer

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             0.0.0.0/0               md5
# IPv6 local connections:
host    all             all             ::1/128                 md5

EOL

echo "restart PostgreSQL"

service postgresql restart

echo "init DB"

sudo -u postgres psql -c "create user velach_bot with password 'pass';"
sudo -u postgres psql -c "create database velach_bot;"
sudo -u postgres psql -c "grant all privileges on database velach_bot to velach_bot;"
