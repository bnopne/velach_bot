INSERT INTO tg_chat (id, greeting_message) VALUES(-153286219, 'TEST GREETING');
INSERT INTO tg_user (id, username, first_name, last_name) VALUES(128540025, 'vasya', 'Вася', 'Витаминка');
INSERT INTO tg_user (id, username, first_name, last_name) VALUES(322954358, 'petya', 'Петя', 'Апатиты');
INSERT INTO tg_chat_user_mtm (tg_chat_id, tg_user_id) VALUES(-153286219, 128540025);
INSERT INTO tg_chat_user_mtm (tg_chat_id, tg_user_id) VALUES(-153286219, 322954358);
