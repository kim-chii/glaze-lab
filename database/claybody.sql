-- this is how you comment in SQL

-- CLAYBODY TABLE -- 
DROP TABLE clays CASCADE;

CREATE TABLE clays (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    notes TEXT
);


INSERT INTO clays (name, notes)
VALUES ('Speckled Buff', 'groggy clay'), ('B-mix', 'smooth off-white clay');


-- GLAZE TABLE -- 
DROP TABLE glazes CASCADE;

CREATE TABLE glazes (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    notes TEXT 
);

INSERT INTO glazes (name, notes)
VALUES ('Koke White', 'a good all around white glaze that is very stable');

INSERT INTO glazes (name, notes)
VALUES ('Magical Mist', 'a great combo glaze, can be runny');

INSERT INTO glazes (name, notes)
VALUES ('Castille Blue', 'a nice blue glaze');

-- GLAZETEST TABLE -- 

DROP TABLE glaze_tests CASCADE;
CREATE TABLE glaze_tests (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    notes TEXT,
    clay_id INT REFERENCES clays ON DELETE CASCADE
);

INSERT INTO glaze_tests (name, notes, clay_id)
VALUES ('Glaze Test 1', 'magical mist / koke white', 1), ('Glaze Test 2', 'koke white / magical mist', 2);

-- create junction table for glazes to glaze tests
DROP TABLE glazetests_glazes CASCADE;
CREATE TABLE glazetests_glazes(
    glaze_test_id INTEGER REFERENCES glaze_tests(id) ON DELETE CASCADE,
    glaze_id INTEGER REFERENCES glazes(id) ON DELETE CASCADE,
    CONSTRAINT glazetests_glazes_pk PRIMARY KEY(glaze_test_id,glaze_id) 
);

INSERT INTO glazetests_glazes (glaze_test_id, glaze_id)
VALUES (1, 1), (1, 2); -- (test 1, magical mist), (test 1, koke white)

INSERT INTO glazetests_glazes (glaze_test_id, glaze_id)
VALUES (2, 2), (2, 1); -- (test 2, magical mist), (test 1, koke white)





