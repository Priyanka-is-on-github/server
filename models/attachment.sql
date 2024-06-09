CREATE TABLE attachment(
    id BIGSERIAL NOT NULL,
    name VARCHAR(255),
    url TEXT,
    courseid INT NOT NULL,
    createdat VARCHAR(255),
    updatedat VARCHAR(255),

     CONSTRAINT fk_categorymodel
        FOREIGN KEY(courseid)
            REFERENCES course(id)


        );