-- CREATE TABLE IF NOT EXISTS userprogress(
--         id BIGSERIAL PRIMARY KEY,
--         userid INT NOT NULL,

--         chapterid INT NOT NULL,
        
--         CONSTRAINT fk_userprogress
--             FOREIGN KEY(chapterid)
--                 REFERENCES chapters(id) ON DELETE CASCADE


--         iscompleted BOOLEAN DEFAULT false,
--          createdat TIMESTAMPTZ DEFAULT NOW(),
--             updatedat TIMESTAMPTZ DEFAULT NOW(),

--             @@unique(userid, chapterid)
--             @@index([chapterid])
--     )

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
