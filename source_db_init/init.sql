CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    date_of_birth DATE
);

INSERT INTO users (first_name, last_name, email, date_of_birth) VALUES
('Alex', 'Smith', 'alexsmith@orangehome.co.uk', '1990-03-01'),
('Robert', 'Waters', 'florist112@gmail.com', '1982-05-25'),
('Roger', 'White', 'bookworm24@yahoo.com', '1986-10-21'),
('Walter A.', 'Hunter', 'whunt404@yahoo.com', '1976-10-01'),
('Kenneth', 'Black', 'kennethblack@gmail.com', '1999-07-02'),
('Marie', 'Johnson', 'mariesworld@gmail.com.com', '1987-02-14'),
('Peter B.', 'Raleigh', 'peterr24@yahoo.com', '1986-02-21'),
('Michael', 'McMahon', 'michaelaaronmcmahon@gmail.com', '1995-06-05'),
('Eileen', 'Terrence', 'sarahlewis@gmail.com', '1989-03-25'),
('Jasmine', 'Jian Jr.', 'jjianjr@gmail.com', '1999-02-15'),
('Joanne', 'Walker', 'joannejj@gmail.com', '1992-11-12'),
('Mitchell', 'Whitman', 'mitchelwhitman@yahoo.com', '1996-08-08'),
('Joseph', 'Carole', 'jcarole66@gmail.com', '1984-04-20'),
('Harry', 'Baldwin', 'hbaldwin@gmail.com', '1993-12-30'),
('Larry', 'Lincoln III', 'thirdllincoln@gmail.com', '1998-05-30'),
('Marissa', 'Patrick', 'mpat@planetall.com', '1990-09-15'),
('Stephanie', 'Wright', 'stephwright@yahoo.com', '1997-05-10'),
('Jennifer', 'Katz', 'jenniferkatz@poboxes.info', '1986-07-22');

-- CREATE TABLE authors (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(50),
--     last_name VARCHAR(50),
--     country_of_origin VARCHAR(50),
--     date_of_birth DATE
-- )

-- INSERT INTO authors (first_name, last_namem country_of_origin, date_of_birth) VALUES
-- ("Fyodor", "Dostoevsky", "Russia", "11-11-1821"),
-- ("George", "Orwell", "England", )
