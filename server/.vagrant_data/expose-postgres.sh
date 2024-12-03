sed -i "s|#listen_addresses = 'localhost'|listen_addresses = '*'|g" /etc/postgresql/14/main/postgresql.conf
sed -i "s|127.0.0.1/32|0.0.0.0/0|g" /etc/postgresql/14/main/pg_hba.conf
systemctl restart postgresql.service
