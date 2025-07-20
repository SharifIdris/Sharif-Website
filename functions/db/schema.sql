-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  brief TEXT NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  tech TEXT[] NOT NULL,
  link VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  date TIMESTAMP NOT NULL,
  read_time VARCHAR(50) DEFAULT '5 min read',
  category VARCHAR(50) NOT NULL,
  featured BOOLEAN DEFAULT false,
  youtube_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  icon VARCHAR(50) NOT NULL,
  featured BOOLEAN DEFAULT false,
  items TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  "order" INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profile Settings Table
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  linkedin VARCHAR(255) NOT NULL,
  github VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(255) NOT NULL,
  cv VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default profile if not exists
INSERT INTO profile (name, title, image, bio, location, email, linkedin, github, whatsapp, cv)
SELECT 
  'Angole Sharif Abubakar', 
  'Virtual Assistant & AI Tools Expert', 
  '/images/profile.jpg', 
  'Computer Science student at Busitema University, Certified Virtual Assistant, and AI & Automation Specialist trained by ALX Africa. I help businesses streamline operations through AI-powered automation, virtual assistance, and modern web development solutions.',
  'Lira, Uganda',
  'sharifidris8@gmail.com',
  'https://www.linkedin.com/in/angole-sharif-abubakar',
  'https://github.com/SharifIdris',
  'https://wa.me/sharifidris8',
  '/files/Sharif_Abubakar_CV.pdf'
WHERE NOT EXISTS (SELECT 1 FROM profile);