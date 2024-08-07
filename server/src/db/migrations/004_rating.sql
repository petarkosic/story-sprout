\c story_sprout;

CREATE TABLE ratings (
    rating_id SERIAL,
    story_id INT,
    user_id INT,
    rating NUMERIC(3, 2) NOT NULL CHECK (rating >= 0 AND rating <= 5) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rating_id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE (story_id, user_id) -- Limits the user to rate a story only once.
);

CREATE INDEX idx_ratings_story_id ON ratings(story_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);


INSERT INTO ratings (story_id, user_id, rating)
VALUES
    (1, 1, 4.5),
    (1, 2, 4.0),
    (1, 3, 5.0),
    (1, 4, 4.0),
    (1, 5, 4.5),
    (1, 6, 3.5),

    (2, 1, 3.5),
    (2, 2, 4.5),
    (2, 3, 4.0),
    (2, 4, 3.5),
    (2, 5, 4.0),
    (2, 6, 3.0),

    (3, 1, 4.0),
    (3, 2, 3.0),
    (3, 3, 4.5),
    (3, 4, 4.0),
    (3, 5, 3.5),
    (3, 6, 3.0),

    (4, 1, 5.0),
    (4, 2, 4.0),
    (4, 3, 3.5),
    (4, 4, 4.0),
    (4, 5, 4.5),
    (4, 6, 4.0),

    (5, 1, 3.0),
    (5, 2, 4.0),
    (5, 3, 4.5),
    (5, 4, 3.5),
    (5, 5, 4.0),
    (5, 6, 4.5),

    (6, 1, 2.5),
    (6, 2, 3.5),
    (6, 3, 4.0),
    (6, 4, 3.5),
    (6, 5, 3.0),
    (6, 6, 4.0),

    (7, 1, 4.0),
    (7, 2, 5.0),
    (7, 3, 4.5),
    (7, 4, 4.0),
    (7, 5, 3.5),
    (7, 6, 3.0),

    (8, 1, 3.5),
    (8, 2, 4.0),
    (8, 3, 4.5),
    (8, 4, 4.0),
    (8, 5, 3.5),
    (8, 6, 3.0),

    (9, 1, 5.0),
    (9, 2, 4.5),
    (9, 3, 4.0),
    (9, 4, 3.5),
    (9, 5, 4.0),
    (9, 6, 3.5);