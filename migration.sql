CREATE SCHEMA blog;

CREATE TABLE IF NOT EXISTS blog.post (
    id serial primary key,
    authorid bigint,
    title text,
    content text
);

CREATE TABLE if not EXISTS blog.user (
    id serial primary key,
    username text,
    password text
);
