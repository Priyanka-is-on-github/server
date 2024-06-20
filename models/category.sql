CREATE TABLE category(
    id BIGSERIAL NOT NULL, 
    name VARCHAR(255)


     CONSTRAINT fk_categorymodel
       FOREIGN KEY(categoryid)
         REFERENCES category(id)
   
);


   
    

    -
