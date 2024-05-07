CREATE DATABASE story_sprout;

\c story_sprout;

CREATE TABLE stories (
    story_id SERIAL,
    story_headline VARCHAR(255) NOT NULL,
    rating NUMERIC(3,2), 
    PRIMARY KEY (story_id)
);

CREATE TABLE sentences (
    sentence_id SERIAL,
    story_id SERIAL,
    parent_sentence_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sentence_id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
    FOREIGN KEY (parent_sentence_id) REFERENCES sentences(sentence_id)
);