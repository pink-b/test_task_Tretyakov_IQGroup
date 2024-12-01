CREATE DATABASE test_task_tretyakov_iqgroup;
GRANT ALL PRIVILEGES ON DATABASE test_task_tretyakov_iqgroup TO postgres;

-- Создание таблицы для сделок (deals)
CREATE TABLE IF NOT EXISTS deals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    phoneNumber VARCHAR(15),
    budget NUMERIC,
    fullName VARCHAR(100)
);

-- Создание таблицы для комментариев (comments)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dealId INTEGER REFERENCES deals(id) ON DELETE CASCADE
);