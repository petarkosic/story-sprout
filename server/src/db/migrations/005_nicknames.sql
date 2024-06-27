ALTER TABLE users
ADD COLUMN nickname VARCHAR(255) UNIQUE;

UPDATE users
SET nickname = 'john'
WHERE email = 'john.doe@gmail.com';

UPDATE users
SET nickname = 'emily'
WHERE email = 'emily.johnson@gmail.com';

UPDATE users
SET nickname = 'michael'
WHERE email = 'michael.brown@gmail.com';

UPDATE users
SET nickname = 'sarah'
WHERE email = 'sarah.davis@gmail.com';

UPDATE users
SET nickname = 'david'
WHERE email = 'david.miller@gmail.com';

UPDATE users
SET nickname = 'jessica'
WHERE email = 'jessica.wilson@gmail.com';

ALTER TABLE users
ALTER COLUMN nickname
SET NOT NULL;