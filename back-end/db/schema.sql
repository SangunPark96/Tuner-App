DROP DATABASE IF EXISTS playlist_songs;
CREATE DATABASE playlist_songs;


\c playlist_songs;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
);