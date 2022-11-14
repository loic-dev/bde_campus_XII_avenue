

CREATE TABLE roles(
   id_role UUID NOT NULL,
   name_role VARCHAR(255) NOT NULL,
   PRIMARY KEY(id_role)
);

CREATE TABLE users(
    id_user uuid NOT NULL,
    id_role uuid NOT NULL,
    lastname varchar(50),
    firstname varchar(50),
    email varchar(50),
    password varchar(50),
    verify boolean,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (id_user),
    CONSTRAINT fk_role
      FOREIGN KEY(id_role) 
	  REFERENCES roles(id_role)
);


CREATE TABLE events(
   id_event UUID NOT NULL,
   name_event VARCHAR(50) NOT NULL,
   desc_event VARCHAR(255),
   date_event timestamp,
   signup_event BOOLEAN,
   PRIMARY KEY(id_event)
);


CREATE TABLE register (
   id_register UUID,
   id_event UUID,
   lastname_register VARCHAR(50),
   firstname_register VARCHAR(50),
   email_register VARCHAR(50),
   comment_register VARCHAR(255),
   PRIMARY KEY(id_register),
   CONSTRAINT fk_event
      FOREIGN KEY(id_event) 
	  REFERENCES events(id_event)
);


CREATE TABLE images (
   id_image UUID,
   id_event UUID,
   link_image VARCHAR(255),
   PRIMARY KEY(id_image),
   CONSTRAINT fk_event
      FOREIGN KEY(id_event) 
	  REFERENCES events(id_event)
);


CREATE TABLE panel (
   id_panel UUID,
   id_image UUID,
   desc_panel VARCHAR(500),
   title_panel VARCHAR(50),
   PRIMARY KEY(id_panel),
   CONSTRAINT fk_image
      FOREIGN KEY(id_image)
	  REFERENCES images(id_image)
);


CREATE TABLE partner (
   id_partner UUID,
   id_image UUID,
   name_partner VARCHAR(50),
   desc_partner VARCHAR(255),
   PRIMARY KEY(id_partner),
   CONSTRAINT fk_image
      FOREIGN KEY(id_image) 
	  REFERENCES images(id_image)
);








