CREATE TABLE users (
    id UUID,
    username text,
    email text,
    password text,
    phone text,
    email_confirmed boolean,
    created_at text,
    updated_at text,
    PRIMARY KEY (id)
)