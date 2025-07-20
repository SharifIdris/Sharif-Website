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

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  content TEXT NOT NULL,
  image VARCHAR(255),
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default profile if not exists
INSERT INTO profile (name, title, image, bio, location, email, linkedin, github, whatsapp, cv)
SELECT 
  'Angole Sharif Abubakar', 
  'Virtual Assistant & AI Tools Expert', 
  '/images/profile.jpg', 
  'I\'m Angole Sharif Abubakar, a Certified Virtual Assistant and AI Tools Expert through ALX, currently pursuing Computer Science at Busitema University while deepening my skillset in Data Science and Cybersecurity. I specialize in designing intelligent systems that simplify workflows, scale businesses, and solve real-world problems through automation, creative design, and strategic implementation. My work merges technical precision with human-centered thinking: from building AI-powered dashboards and responsive portfolios to integrating scalable authentication systems using Firebase and Supabase. Whether it\'s client automation, full-stack development, or project coordination, I create digital experiences that adapt and evolve. I believe tech should be beginner-friendly, strategic, and socially impactful, and I\'m committed to building tools that reflect that mission.',
  'Lira, Uganda',
  'sharifidris8@gmail.com',
  'https://www.linkedin.com/in/angole-sharif-abubakar',
  'https://github.com/SharifIdris',
  'https://wa.me/sharifidris8',
  '/files/Sharif_Abubakar_CV.pdf'
WHERE NOT EXISTS (SELECT 1 FROM profile);