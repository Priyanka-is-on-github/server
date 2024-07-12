CREATE TABLE Course(
id BIGSERIAL PRIMARY KEY,
userid VARCHAR(255) ,
title VARCHAR(255) NOT NULL,
description TEXT,
 imageurl TEXT,
 price NUMERIC(10,2),
 ispublished BOOLEAN DEFAULT false,
category_name VARCHAR(255),

createdat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
 
);
-- CONSTRAINT fk_usermodel
--     FOREIGN KEY(userid)
--         REFERENCES userinfo(id),

-

-- RESTART WITH 1
-- TRUNCATE TABLE chapters RESTART IDENTITY;