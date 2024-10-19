const pool = require("./db");


async function table(){

   
await pool.query(`CREATE TABLE course(
    id BIGSERIAL PRIMARY KEY,
    teacherid VARCHAR(255) ,
    title VARCHAR(255) NOT NULL,
    description TEXT,
     imageurl TEXT,
     price NUMERIC(10,2),
     ispublished BOOLEAN DEFAULT false,
    categoryid VARCHAR(255),
    progress_percentage INT,
    
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
     
    );`)

await pool.query(`CREATE TABLE  IF NOT EXISTS chapters( 
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    videourl TEXT,
    position INT,
    ispublished BOOLEAN DEFAULT false,
    isfree BOOLEAN DEFAULT false,
    muxdata INT,  
    courseid INT NOT NULL,
    
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_chaptermodel
        FOREIGN KEY(courseid)
         REFERENCES course(id) ON DELETE CASCADE
    );`)


   await pool.query(`    CREATE TABLE IF NOT EXISTS muxdata(
        id BIGSERIAL PRIMARY KEY,
        assetid  TEXT ,
        playbackid TEXT ,

        chapterid INT NOT NULL,
        
        CONSTRAINT fk_muxdatamodel
            FOREIGN KEY(chapterid)
                REFERENCES chapters(id) ON DELETE CASCADE
    );
`)


  



    
await pool.query(`    CREATE TABLE IF NOT EXISTS purchase(
    id BIGSERIAL PRIMARY KEY,
    userid INT NOT NULL,

    courseid INT NOT NULL,
    createdat TIMESTAMPTZ DEFAULT NOW(),
        updatedat TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT fk_purchase
        FOREIGN KEY(courseid)
            REFERENCES course(id) ON DELETE CASCADE
);`)

await pool.query(`CREATE TABLE attachment(
    id BIGSERIAL NOT NULL,
    name VARCHAR(255),
    url TEXT,
    courseid INT NOT NULL,
    createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

     CONSTRAINT fk_categorymodel
        FOREIGN KEY(courseid)
            REFERENCES course(id)


        )`)

        await pool.query(`CREATE TABLE category(
id BIGSERIAL NOT NULL, 
name VARCHAR(255)



);`)

await pool.query(`    CREATE TABLE IF NOT EXISTS userprogress (
    id BIGSERIAL PRIMARY KEY,
    userid VARCHAR(255),
    chapterid INT NOT NULL,
    courseid VARCHAR(255),
    iscompleted BOOLEAN DEFAULT false,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_userprogress FOREIGN KEY(chapterid) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE(userid, chapterid)  
);
`)

await pool.query(`CREATE TABLE IF NOT EXISTS purchase(
    id BIGSERIAL PRIMARY KEY,
    userid  VARCHAR(255),
    courseid INT,
    createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_purchase FOREIGN KEY(courseid) REFERENCES course(id) ON DELETE CASCADE


);`)

await pool.query(`CREATE TABLE IF NOT EXISTS stripe_customer(
    id BIGSERIAL PRIMARY KEY,
    userid  VARCHAR(255),
    stripe_customer_id VARCHAR(255),

     createdat TIMESTAMPTZ DEFAULT NOW(),
    updatedat TIMESTAMPTZ DEFAULT NOW()
    

);`)
}

module.exports = table;
export{}