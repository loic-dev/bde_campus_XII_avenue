DROP TABLE IF EXISTS partner;
DROP TABLE IF EXISTS panel;
DROP TABLE IF EXISTS register;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;



CREATE TABLE roles (
   id_role UUID NOT NULL,
   name_role VARCHAR(255) NOT NULL,
   PRIMARY KEY(id_role)
);

CREATE TABLE users (
    id_user uuid NOT NULL,
    id_role uuid NOT NULL,
    lastname varchar(255),
    firstname varchar(255),
    email varchar(255),
    password varchar(255),
    verify boolean,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (id_user),
    CONSTRAINT fk_role
      FOREIGN KEY(id_role) 
	  REFERENCES roles(id_role)
);


CREATE TABLE images (
   id_image UUID,
   link_image VARCHAR(255),
   PRIMARY KEY(id_image)
);


CREATE TABLE events (
   id_event UUID NOT NULL,
   id_image UUID,
   name_event VARCHAR(255) NOT NULL,
   desc_event TEXT,
   date_event timestamp,
   signup_event BOOLEAN,
   created_at timestamp,
   updated_at timestamp,
   PRIMARY KEY(id_event),
   CONSTRAINT fk_image
      FOREIGN KEY(id_image)
	  REFERENCES images(id_image)
);

CREATE TABLE register (
   id_register UUID,
   id_event UUID,
   lastname_register VARCHAR(255),
   firstname_register VARCHAR(255),
   email_register VARCHAR(255),
   comment_register VARCHAR(255),
   created_at timestamp,
   updated_at timestamp,
   PRIMARY KEY(id_register),
   CONSTRAINT fk_event
      FOREIGN KEY(id_event) 
	  REFERENCES events(id_event)
);



CREATE TABLE panel (
   id_panel UUID,
   id_image UUID,
   desc_panel TEXT,
   title_panel VARCHAR(255),
   PRIMARY KEY(id_panel),
   CONSTRAINT fk_image
      FOREIGN KEY(id_image)
	  REFERENCES images(id_image)
);


CREATE TABLE partner (
   id_partner UUID,
   id_image UUID,
   name_partner VARCHAR(255),
   desc_partner VARCHAR(500),
   PRIMARY KEY(id_partner),
   CONSTRAINT fk_image
      FOREIGN KEY(id_image) 
	  REFERENCES images(id_image)
);


INSERT INTO public.roles(id_role, name_role) VALUES ('c39cc20a-682b-11ed-9022-0242ac120002', 'member');