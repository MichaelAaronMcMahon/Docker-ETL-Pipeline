CREATE TABLE Users (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    date_of_birth DATE
);

INSERT INTO users (id, first_name, last_name, email, date_of_birth) VALUES
(19, 'Austin', 'Smith', 'austinsmith@orangehome.co.uk', '1992-03-15'),
(20, 'Henry', 'Waters', 'henrywaters@gmail.com', '2002-05-20'),
(21, 'Eain', 'Wallace', 'einwallace@yahoo.com', '2003-10-22'),
(22, 'Erin A.', 'Hudson Sr.', 'erinamandahudson@yahoo.com', '1988-10-08'),
(23, 'Elena C.', 'Black', 'elenacatherine@gmail.com', '1977-07-02'),
(24, 'Maria', 'Johnson', 'mariajohn@gmail.com.com', '1968-02-27');

CREATE TABLE authors (
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    city_of_origin VARCHAR(50),
    country_of_origin VARCHAR(50),
    PRIMARY KEY(first_name, last_name)
);

INSERT INTO authors (first_name, last_name, date_of_birth, city_of_origin, country_of_origin) VALUES
('Haruki', 'Murakami', '1949-01-12', 'Kyoto', 'Japan'),
('Yukio', 'Mishima', '1925-01-14', 'Tokyo', 'Japan'),
('James', 'Joyce', '1941-02-02', 'Dublin', 'Ireland'),
('Oscar', 'Wilde', '1854-10-16', 'Dublin', 'Ireland');

CREATE TABLE favorite_authors(
    user_id INT,
    author_first_name VARCHAR(50),
    author_last_name VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (author_first_name, author_last_name) REFERENCES authors(first_name, last_name),
    PRIMARY KEY (user_id, author_first_name, author_last_name)
);

INSERT INTO favorite_authors VALUES
(19, 'Yukio', 'Mishima'),
(20, 'Oscar', 'Wilde'),
(21, 'Yukio', 'Mishima'),
(22, 'James', 'Joyce'),
(23, 'Haruki', 'Murakami'),
(24, 'James', 'Joyce');