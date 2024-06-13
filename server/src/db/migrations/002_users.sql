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


CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (first_name, last_name, email, password, registered_at)
VALUES 
('John', 'Doe', 'john.doe@gmail.com', crypt('password123', gen_salt('bf', 10)), NOW()),
('Emily', 'Johnson', 'emily.johnson@gmail.com', crypt('password123', gen_salt('bf', 10)), NOW()),
('Michael', 'Brown', 'michael.brown@gmail.com', crypt('password123', gen_salt('bf', 10)), NOW()),
('Sarah', 'Davis', 'sarah.davis@gmail.com', crypt('password123', gen_salt('bf', 10)), NOW()),
('David', 'Miller', 'david.miller@gmail.com', crypt('password123', gen_salt('bf', 10)), NOW()),
('Jessica', 'Wilson', 'jessica.wilson@gmail.com', crypt('password123', gen_salt('bf', 10)), NOW());