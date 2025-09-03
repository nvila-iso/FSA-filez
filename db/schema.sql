-- TODO
DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

CREATE table folders (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE table files (
    id serial PRIMARY KEY,
    name text NOT NULL,
    size integer NOT NULL,
    folder_id integer NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    UNIQUE(name, folder_id)
);
