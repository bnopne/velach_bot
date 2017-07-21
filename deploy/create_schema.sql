CREATE TABLE tg_chat (
  id BIGINT PRIMARY KEY,
  greeting_message TEXT
);

GRANT ALL PRIVILEGES ON tg_chat TO velach_bot;

CREATE TABLE tg_user (
  id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  last_name TEXT
);

GRANT ALL PRIVILEGES ON tg_user TO velach_bot;

CREATE TABLE tg_chat_user_mtm (
  tg_chat_id BIGINT REFERENCES tg_chat (id),
  tg_user_id BIGINT REFERENCES tg_user (id),
  bike_check BOOLEAN DEFAULT FALSE NOT NULL,
  bike_photo_id TEXT,
  PRIMARY KEY (tg_chat_id, tg_user_id)
);

GRANT ALL PRIVILEGES ON tg_chat_user_mtm TO velach_bot;
