-- ============================================================
-- TerraLearn Supabase Database Schema
-- ============================================================
-- Run this in your Supabase SQL Editor to set up the full database

-- Enable PostGIS extension for spatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================
-- 1. PROFILES (Users with roles)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'tourist', 'admin')),
  school_id UUID,
  grade_level INTEGER,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'explorer', 'voyager', 'school')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. EXPERIENCES (Core content)
-- ============================================================
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('nature', 'history', 'stem', 'culture', 'conservation')),
  subcategory TEXT,
  grade_level_min INTEGER DEFAULT 1,
  grade_level_max INTEGER DEFAULT 12,
  duration_seconds INTEGER,
  location_lat DECIMAL(10, 7),
  location_lng DECIMAL(10, 7),
  country TEXT,
  region TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  is_offline_ready BOOLEAN DEFAULT FALSE,
  curator_notes TEXT,
  learning_outcomes TEXT[] DEFAULT '{}',
  curriculum_tags TEXT[] DEFAULT '{}',
  accessibility_features TEXT[] DEFAULT '{}',
  avg_rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial index for location-based queries
CREATE INDEX idx_experiences_location ON experiences USING GIST (
  ST_SetSRID(ST_MakePoint(location_lng, location_lat), 4326)
);

-- ============================================================
-- 3. MEDIA ASSETS (Photos, videos, 3D models, audio)
-- ============================================================
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('360_photo', '360_video', '2d_video', '3d_model', 'point_cloud', 'audio', 'narration')),
  quality_tier TEXT DEFAULT 'basic' CHECK (quality_tier IN ('basic', 'enhanced', 'premium')),
  url TEXT NOT NULL,
  storage_path TEXT,
  resolution TEXT,
  duration INTEGER,
  file_size BIGINT,
  capture_method TEXT,
  ai_enhanced BOOLEAN DEFAULT FALSE,
  license_type TEXT DEFAULT 'creative_commons',
  attribution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. HOTSPOTS (Interactive markers in experiences)
-- ============================================================
CREATE TABLE hotspots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  media_asset_id UUID REFERENCES media_assets(id),
  x DECIMAL(5, 2),
  y DECIMAL(5, 2),
  z DECIMAL(5, 2),
  yaw DECIMAL(5, 2),
  pitch DECIMAL(5, 2),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  related_experience_id UUID REFERENCES experiences(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. QUIZZES (Embedded assessment questions)
-- ============================================================
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer_index INTEGER NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. CLASSES (Teacher-created groups)
-- ============================================================
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  grade_level INTEGER,
  subject TEXT,
  student_count INTEGER DEFAULT 0,
  invite_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. CLASS STUDENTS (Junction table)
-- ============================================================
CREATE TABLE class_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

-- ============================================================
-- 8. ASSIGNMENTS (Teacher-to-class work)
-- ============================================================
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES experiences(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  quiz_required BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_by UUID REFERENCES profiles(id)
);

-- ============================================================
-- 9. STUDENT PROGRESS (Completion tracking)
-- ============================================================
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  time_spent_seconds INTEGER DEFAULT 0,
  quiz_score INTEGER,
  completed_at TIMESTAMPTZ,
  last_position JSONB DEFAULT '{}',
  bookmarks JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, experience_id)
);

-- ============================================================
-- 10. REVIEWS (User ratings and feedback)
-- ============================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT,
  is_teacher BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(experience_id, user_id)
);

-- ============================================================
-- 11. UPLOADS (Content contribution pipeline)
-- ============================================================
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('360_photo', '360_video', 'photo_set', 'video_clip', 'audio')),
  files JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'published', 'rejected')),
  metadata JSONB DEFAULT '{}',
  ai_processing_log JSONB DEFAULT '{}',
  moderator_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. SUBSCRIPTIONS (Payment/entitlement tracking)
-- ============================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'explorer', 'voyager', 'school')),
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  payment_status TEXT DEFAULT 'active' CHECK (payment_status IN ('active', 'cancelled', 'past_due')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. OFFLINE DOWNLOADS (Sync tracking)
-- ============================================================
CREATE TABLE offline_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  storage_used_mb DECIMAL(10, 2),
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  auto_delete_date TIMESTAMPTZ,
  UNIQUE(user_id, experience_id)
);

-- ============================================================
-- 14. CONTENT REQUESTS (Teacher/community requests)
-- ============================================================
CREATE TABLE content_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  location TEXT,
  subject TEXT,
  reason TEXT,
  grade_level INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_progress', 'completed', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotspots ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_requests ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own profile, teachers can read their students
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Experiences: public read for published, creators can CRUD their own
CREATE POLICY "Public read published experiences" ON experiences FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Creators can manage own experiences" ON experiences FOR ALL USING (auth.uid() = created_by);

-- Media assets: public read for published experience media
CREATE POLICY "Public read media for published" ON media_assets FOR SELECT USING (
  EXISTS (SELECT 1 FROM experiences WHERE experiences.id = media_assets.experience_id AND experiences.is_published = TRUE)
);

-- Student progress: students can CRUD their own
CREATE POLICY "Students manage own progress" ON student_progress FOR ALL USING (auth.uid() = student_id);

-- Classes: teachers can manage their own, students can read their classes
CREATE POLICY "Teachers manage own classes" ON classes FOR ALL USING (auth.uid() = teacher_id);
CREATE POLICY "Students read their classes" ON class_students FOR SELECT USING (auth.uid() = student_id);

-- Reviews: public read, users can create/update their own
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Users manage own reviews" ON reviews FOR ALL USING (auth.uid() = user_id);

-- Uploads: users can manage their own
CREATE POLICY "Users manage own uploads" ON uploads FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Update average rating when a review is added/modified
CREATE OR REPLACE FUNCTION update_experience_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE experiences
  SET avg_rating = (
    SELECT COALESCE(AVG(rating), 0) FROM reviews WHERE experience_id = COALESCE(NEW.experience_id, OLD.experience_id)
  ),
  review_count = (
    SELECT COUNT(*) FROM reviews WHERE experience_id = COALESCE(NEW.experience_id, OLD.experience_id)
  )
  WHERE id = COALESCE(NEW.experience_id, OLD.experience_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_rating_update
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_experience_rating();

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_experiences_timestamp BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_uploads_timestamp BEFORE UPDATE ON uploads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_student_progress_timestamp BEFORE UPDATE ON student_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- FULL-TEXT SEARCH (for experience search)
-- ============================================================
ALTER TABLE experiences ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(country, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(learning_outcomes, ' '), '')), 'D')
  ) STORED;

CREATE INDEX idx_experiences_search ON experiences USING GIN(search_vector);

-- ============================================================
-- STORAGE BUCKETS (run in Supabase Storage settings)
-- ============================================================
-- Create bucket: experience-media (public)
-- Create bucket: user-uploads (private)
-- Create bucket: 3d-assets (public)
-- Create bucket: offline-packs (private)

-- ============================================================
-- SAMPLE DATA (for development)
-- ============================================================
INSERT INTO experiences (title, slug, description, category, subcategory, grade_level_min, grade_level_max, duration_seconds, country, is_premium, is_published, is_offline_ready, learning_outcomes, avg_rating, review_count) VALUES
('Serengeti Great Migration', 'serengeti-great-migration', 'Witness one of Earth\'s greatest wildlife spectacles', 'nature', 'wildlife', 4, 9, 900, 'Tanzania', false, true, true, ARRAY['Animal migration patterns', 'Ecosystem interdependence'], 4.8, 234),
('The Grand Canyon Layers', 'grand-canyon-layers', 'Explore 2 billion years of Earth history', 'nature', 'canyons', 6, 12, 1200, 'USA', false, true, true, ARRAY['Rock stratification', 'Geological time scales'], 4.9, 412),
('Great Barrier Reef Dive', 'great-barrier-reef-dive', 'Descend into the world\'s largest coral reef system', 'nature', 'reefs', 5, 10, 600, 'Australia', false, true, true, ARRAY['Coral biology', 'Marine biodiversity'], 4.7, 189),
('Machu Picchu: Lost City', 'machu-picchu-lost-city', 'Walk through the Inca citadel', 'history', 'monuments', 7, 12, 1500, 'Peru', true, true, false, ARRAY['Inca engineering', 'Astronomical alignment'], 4.9, 567),
('The Human Heart: Up Close', 'human-heart-up-close', 'Layer-by-layer interactive heart dissection', 'stem', 'biology', 6, 12, 900, 'Human Body', false, true, true, ARRAY['Cardiac anatomy', 'Blood circulation'], 4.9, 312),
('Acid-Base Titration Lab', 'acid-base-titration', 'Virtual titration experiment with pH meter', 'stem', 'chemistry', 9, 12, 800, 'Lab', false, true, true, ARRAY['Acid-base neutralization', 'pH and indicators'], 4.6, 167),
('Pendulum Physics Lab', 'pendulum-physics-lab', 'Adjust pendulum parameters and discover the period formula', 'stem', 'physics', 7, 12, 800, 'Lab', false, true, true, ARRAY['Simple harmonic motion', 'Period and frequency'], 4.7, 176);

-- ============================================================
-- END OF SCHEMA
-- ============================================================
