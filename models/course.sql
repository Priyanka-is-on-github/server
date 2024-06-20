CREATE TABLE Course(
id BIGSERIAL PRIMARY KEY,
userid INT ,
title VARCHAR(255) NOT NULL,
description TEXT,
 imageurl TEXT,
 price NUMERIC(10,2),
 ispublished BOOLEAN,
categoryid INT,

 createdat VARCHAR(255),
 updatedat VARCHAR(255) 
 
);
-- CONSTRAINT fk_usermodel
--     FOREIGN KEY(userid)
--         REFERENCES userinfo(id),

-