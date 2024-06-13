INSERT INTO stories (story_headline, user_id) 
VALUES 
('Echoes of Eternity', 1),
('Whispers in the Mist', 2),
('Beyond the Veil', 3),
('Lost in Time', 5),
('Threads of Fate', 3),
('Shadows of Destiny', 6),
('Sirens'' Song', 1),
('Chronicles of the Unknown', 2),
('Realm of Imagination', 4);


INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(1, NULL, 'The old clock tower stood tall in the town square, its hands frozen in time.'),
(1, 1, 'Every night, the townsfolk heard mysterious echoes emanating from within its ancient walls.'),
(1, 2, 'Some believed the echoes were whispers from the past, while others feared they heralded an ominous future.'),
(1, 3, 'Curiosity drew brave souls to explore the tower, seeking answers hidden within its silent halls.'),
(1, 4, 'As they climbed the winding stairs, the echoes grew louder, enveloping them in a cacophony of voices from another age.'),
(1, 4, 'Among the voices, they heard snippets of conversations and fragments of long-forgotten melodies, echoing through the corridors of time.');


INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(2, NULL, 'A dense mist enveloped the forest, obscuring all but the faintest outlines of trees.'),
(2, 7, 'Whispers floated through the mist, carrying tales of forgotten spirits and lost souls.'),
(2, 7, 'Some said the mist held the secrets of the ancient forest, while others warned of the dangers lurking within its depths.'),
(2, 8, 'Brave adventurers ventured into the mist, their lanterns casting eerie shadows on the swirling fog.'),
(2, 8, 'Each step forward felt like a step into the unknown, as if the mist concealed both danger and discovery.');


INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(3, NULL, 'The veil between the worlds was thin, and strange creatures roamed the streets under the pale moonlight.'),
(3, 12, 'Adventurers from distant lands sought passage beyond the veil, risking everything for untold treasures.'),
(3, 12, 'Some claimed to have glimpsed the other side, describing a realm of wonders and terrors beyond imagination.'),
(3, 13, 'A mysterious gate stood at the edge of the world, its ancient runes beckoning to those brave enough to cross.'),
(3, 14, 'As they passed through the gate, reality shifted, and they found themselves in a world unlike any they had ever known.'),
(3, 14, 'The air crackled with energy, and they felt the weight of destiny pressing down upon them.');

INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(4, NULL, 'A traveler stumbled upon an ancient artifact, a pocket watch that seemed to defy the laws of time.'),
(4, 18, 'With each turn of its gears, the traveler found themselves transported to a different era, lost in the vast expanse of history.'),
(4, 19, 'They witnessed great civilizations rise and fall, their own existence a mere whisper in the annals of time.'),
(4, 19, 'Haunted by visions of the past, the traveler searched for a way to return to their own time, but the watch held them captive in its timeless embrace.'),
(4, 20, 'As they journeyed through the ages, they discovered that the key to their salvation lay not in escaping the past, but in embracing it.'),
(4, 21, 'The past became their present, and the future remained a mystery waiting to unfold.');

INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(5, NULL, 'Threads of destiny intertwined, weaving a tapestry of lives across generations.'),
(5, 24, 'Each decision, no matter how small, sent ripples through the fabric of fate, shaping the course of history.'),
(5, 24, 'Some believed in the power of free will, while others saw their lives as predetermined by the threads of fate.'),
(5, 25, 'As they navigated the twists and turns of destiny, they grappled with questions of choice and consequence, seeking to unravel the mysteries of their intertwined lives.'),
(5, 26, 'In the end, they realized that fate was not a force to be defied, but a path to be embraced, leading them to their ultimate destinies.'),
(5, 26, 'Their stories intertwined like the threads of a tapestry, forming a picture of life''s infinite possibilities.');

INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(6, NULL, 'In the shadowy alleyways of the city, a figure lurked, its intentions hidden in darkness.'),
(6, 30, 'The shadowy figure held the key to a long-forgotten prophecy, one that foretold the end of days.'),
(6, 31, 'As they delved deeper into the shadows, they uncovered a web of intrigue and betrayal, where nothing was as it seemed.'),
(6, 31, 'Each step brought them closer to the truth, but also deeper into the heart of darkness, where even the light of hope could not penetrate.'),
(6, 32, 'In the end, they faced a choice: to embrace the shadows and their dark destiny, or to fight against the tide and forge their own path to salvation.'),
(6, 33, 'The shadows whispered secrets of the past and promises of the future, enticing them to choose their fate.');

INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(7, NULL, 'The haunting melody of the siren''s song echoed across the waves, drawing sailors to their doom.'),
(7, 36, 'Only those with the strength to resist the siren''s call could hope to navigate the treacherous waters unscathed.'),
(7, 36, 'Some succumbed to the siren''s song, lured by promises of love and adventure, only to meet a watery grave at the hands of the sea.'),
(7, 37, 'As they sailed into the heart of the storm, they knew that their only hope of survival lay in breaking free from the siren''s enchantment.'),
(7, 37, 'In the end, they emerged battered but victorious, their wills unbroken by the siren''s song, their souls untouched by the sea''s embrace.'),
(7, 38, 'Their journey continued, forever haunted by the echoes of the siren''s song.');

INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(8, NULL, 'Legends spoke of a hidden city, veiled in mystery and shrouded in secrecy.'),
(8, 42, 'Those who dared to venture into the unknown were never heard from again, their fates forever entwined with the chronicles of the unknown.'),
(8, 43, 'Some believed the city to be a gateway to other worlds, while others saw it as a prison for lost souls, trapped in a realm beyond comprehension.'),
(8, 43, 'As they searched for clues to unlock the city''s secrets, they uncovered a conspiracy that spanned centuries, threatening to unravel the very fabric of reality itself.'),
(8, 44, 'In the end, they faced a choice: to reveal the truth and risk the wrath of those who sought to keep the city hidden, or to turn away and let the mysteries of the unknown remain shrouded in darkness.'),
(8, 44, 'The unknown beckoned, its secrets waiting to be discovered by those brave enough to seek them.');

INSERT INTO sentences (story_id, parent_sentence_id, content)
VALUES 
(9, NULL, 'In the realm of imagination, anything was possible, and dreams took flight on the wings of creativity.'),
(9, 48, 'With each stroke of the pen, new worlds were born, waiting to be explored by those brave enough to dream.'),
(9, 48, 'Some saw the realm as a playground for the mind, where they could unleash their wildest fantasies and explore the furthest reaches of their imagination.'),
(9, 49, 'As they journeyed through the realm, they encountered creatures of myth and legend, each more fantastical than the last.'),
(9, 49, 'In the end, they discovered that the true power of the realm lay not in its wonders, but in the endless possibilities it offered for creation and exploration.'),
(9, 50, 'Their imaginations soared, unrestricted by the boundaries of reality, as they continued to weave tales of wonder and adventure.');