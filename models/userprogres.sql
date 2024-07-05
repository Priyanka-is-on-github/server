

    CREATE TABLE IF NOT EXISTS userprogress (
    id BIGSERIAL PRIMARY KEY,
    userid INT NOT NULL,
    chapterid INT NOT NULL,
    iscompleted BOOLEAN DEFAULT false,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_userprogress FOREIGN KEY(chapterid) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE(userid, chapterid)
);

CREATE INDEX idx_userprogress_chapterid ON userprogress(chapterid);




CREATE TABLE IF NOT EXISTS purchase{
    id BIGSERIAL PRIMARY KEY,
    userid INT NOT NULL,
    courseid INT,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_purchase FOREIGN KEY(courseid) REFERENCES course(id) ON DELETE CASCADE,


}
CREATE INDEX idx_purchase_courseid ON purchase(courseid);