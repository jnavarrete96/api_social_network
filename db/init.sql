-- db/init.sql

-- 1) Extensión para UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) Tabla users (tu cambio)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  user_name VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3) Tabla posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4) Tabla likes
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- 5) Datos de prueba (Seeder)
INSERT INTO users (full_name, birth_date, user_name, email, password_hash)
VALUES (
  'Test User',
  '1990-01-01',
  'testuser',
  'test@example.com',
  '$2b$10$saltsaltsaltsaltsaltsaltsaltsaltsaltsaltsa'  -- placeholder bcrypt
)
ON CONFLICT (user_name) DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Hello world! This is a seeded post.'
FROM users
WHERE user_name = 'testuser'
ON CONFLICT DO NOTHING;

INSERT INTO users (full_name, birth_date, user_name, email, password_hash)
VALUES (
  'Test User Two',
  '1990-01-01',
  'testuser2',
  'test2@example.com',
  '$2b$10$saltsaltsaltsaltsaltsaltsaltsaltsaltsaltsa'  -- placeholder bcrypt
)
ON CONFLICT (user_name) DO NOTHING;

INSERT INTO posts (user_id, content)
SELECT id, 'Hello world! This is a seeded post.'
FROM users
WHERE user_name = 'testuser2'
ON CONFLICT DO NOTHING;
