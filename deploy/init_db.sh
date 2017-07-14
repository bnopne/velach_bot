sudo -u postgres psql -f 'create_user_and_db.sql';
sudo -u postgres psql -d 'velach_bot' -f 'create_schema.sql';
