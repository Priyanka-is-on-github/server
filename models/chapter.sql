CREATE TABLE  IF NOT EXISTS chapters( 
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    videourl TEXT,
    position INT,
    ispublished BOOLEAN DEFAULT false,
    isfree BOOLEAN DEFAULT false,
    muxdata muxdata?
    courseid INT NOT NULL,
    userprogress userprogress[]
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_chaptermodel
        FOREIGN KEY(courseid)
         REFERENCES course(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS muxdata(
        id BIGSERIAL PRIMARY KEY,
        assetid  INT NOT NULL
        playbackid INT

        chapterid INT NOT NULL,
        CONSTRAINT fk_muxdatamodel
            FOREIGN KEY(chapterid)
                REFERENCES chapters(id) ON DELETE CASCADE
    )

    CREATE TABLE IF NOT EXISTS userprogress(
        id BIGSERIAL PRIMARY KEY,
        userid INT NOT NULL,

        chapterid INT NOT NULL,
        
        CONSTRAINT fk_userprogress
            FOREIGN KEY(chapterid)
                REFERENCES chapters(id) ON DELETE CASCADE


        iscompleted BOOLEAN DEFAULT false,
         createdat TIMESTAMPTZ DEFAULT NOW(),
            updatedat TIMESTAMPTZ DEFAULT NOW(),

            @@unique(userid, chapterid)
            @@index([chapterid])
    )


    CREATE TABLE IF NOT EXISTS purchase(
        id BIGSERIAL PRIMARY KEY,
        userid INT NOT NULL,

        courseid INT NOT NULL,
        CONSTRAINT fk_purchase
            FOREIGN KEY(courseid)
                REFERENCES course(id) ON DELETE CASCADE

         createdat TIMESTAMPTZ DEFAULT NOW(),
            updatedat TIMESTAMPTZ DEFAULT NOW(),
    )

CREATE TABLE IF NOT EXISTS stripecustomer(
    id BIGSERIAL PRIMARY KEY,
    userid INT NOT NULL,
    stripecustomerid INT NOT NULL,

     createdat TIMESTAMPTZ DEFAULT NOW(),
            updatedat TIMESTAMPTZ DEFAULT NOW(),
)


