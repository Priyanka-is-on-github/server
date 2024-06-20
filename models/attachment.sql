CREATE TABLE attachment(
    id BIGSERIAL NOT NULL,
    name VARCHAR(255),
    url TEXT,
    courseid INT NOT NULL,
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

     CONSTRAINT fk_categorymodel
        FOREIGN KEY(courseid)
            REFERENCES course(id)


        );