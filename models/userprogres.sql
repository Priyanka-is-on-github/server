

    CREATE TABLE IF NOT EXISTS userprogress (
    id BIGSERIAL PRIMARY KEY,
    userid VARCHAR(255),
    chapterid INT NOT NULL,
    iscompleted BOOLEAN DEFAULT false,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_userprogress FOREIGN KEY(chapterid) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE(userid, chapterid)  
);

CREATE INDEX idx_userprogress_chapterid ON userprogress(chapterid);




CREATE TABLE IF NOT EXISTS purchase(
    id BIGSERIAL PRIMARY KEY,
    userid  VARCHAR(255),
    courseid INT,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_purchase FOREIGN KEY(courseid) REFERENCES course(id) ON DELETE CASCADE


);
CREATE INDEX idx_purchase_courseid ON purchase(courseid);


CREATE TABLE IF NOT EXISTS stripe_customer(
    id BIGSERIAL PRIMARY KEY,
    userid  VARCHAR(255),
    stripe_customer_id VARCHAR(255),

     createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW()
    

);