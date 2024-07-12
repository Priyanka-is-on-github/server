CREATE TABLE  IF NOT EXISTS chapters( 
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    videourl TEXT,
    position INT,
    ispublished BOOLEAN DEFAULT false,
    isfree BOOLEAN DEFAULT false,
    muxdata INT,  
    courseid INT NOT NULL,
    -- userprogress userprogress[],
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_chaptermodel
        FOREIGN KEY(courseid)
         REFERENCES course(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS muxdata(
        id BIGSERIAL PRIMARY KEY,
        assetid  TEXT ,
        playbackid TEXT ,

        chapterid INT NOT NULL,
        
        CONSTRAINT fk_muxdatamodel
            FOREIGN KEY(chapterid)
                REFERENCES chapters(id) ON DELETE CASCADE
    );

    


    CREATE TABLE IF NOT EXISTS purchase(
        id BIGSERIAL PRIMARY KEY,
        userid INT NOT NULL,

        courseid INT NOT NULL,
        createdat TIMESTAMPTZ DEFAULT NOW(),
            updatedat TIMESTAMPTZ DEFAULT NOW(),
            CONSTRAINT fk_purchase
            FOREIGN KEY(courseid)
                REFERENCES course(id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS stripecustomer(
    id BIGSERIAL PRIMARY KEY,
    userid INT NOT NULL,
    stripecustomerid INT NOT NULL,

     createdat TIMESTAMPTZ DEFAULT NOW(),
            updatedat TIMESTAMPTZ DEFAULT NOW()
);


