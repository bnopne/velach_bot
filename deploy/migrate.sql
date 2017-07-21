ALTER TABLE tg_chat_user_mtm
  DROP COLUMN IF EXISTS bike_check,
  ADD COLUMN bike_photo_id TEXT;
