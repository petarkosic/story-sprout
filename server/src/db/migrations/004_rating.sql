CREATE TABLE ratings (
    rating_id SERIAL,
    story_id INT,
    user_id INT,
    rating NUMERIC(3, 2) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rating_id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE (story_id, user_id) -- Limits the user to rate a story only once.
);

CREATE INDEX idx_ratings_story_id ON ratings(story_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);