CREATE TABLE users(
    user_id SERIAL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

ALTER TABLE stories
ADD COLUMN user_id INT,
ADD CONSTRAINT stories_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id);

ALTER TABLE sentences
ADD COLUMN user_id INT,
ADD CONSTRAINT sentences_user_id_fk FOREIGN KEY (user_id) REFERENCES users(user_id);
