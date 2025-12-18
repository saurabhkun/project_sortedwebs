/*
  # Create websites table for SortedWebs

  1. New Tables
    - `websites`
      - `id` (uuid, primary key)
      - `title` (text) - Website title
      - `description` (text) - Short description
      - `url` (text) - Website URL
      - `category` (text) - Category: Research, Design, Dev Tools, Entertainment
      - `favicon_url` (text) - URL to favicon
      - `is_favorite` (boolean) - Mark as favorite
      - `is_archived` (boolean) - Mark as archived
      - `created_at` (timestamp) - Creation timestamp

  2. Security
    - Enable RLS on `websites` table
    - Add policy to allow all operations (public access for development)

  3. Initial Data
    - Seed with 4 example websites
*/

CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  category text NOT NULL,
  favicon_url text,
  is_favorite boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for public"
  ON websites
  FOR ALL
  USING (true)
  WITH CHECK (true);

INSERT INTO websites (title, description, url, category, favicon_url, is_favorite, is_archived) VALUES
  ('Intro to Quantum Computing', 'Comprehensive guide to quantum computing concepts', 'https://quantum.ibm.com', 'Research', 'https://www.ibm.com/favicon.ico', false, false),
  ('Dribbble Inspiration', 'Design inspiration and portfolio showcase', 'https://dribbble.com', 'Design', 'https://dribbble.com/favicon.ico', false, false),
  ('React Documentation', 'Official React documentation and guides', 'https://react.dev', 'Dev Tools', 'https://react.dev/favicon.ico', false, false),
  ('Netflix', 'Streaming entertainment platform', 'https://netflix.com', 'Entertainment', 'https://www.netflix.com/favicon.ico', false, false)
ON CONFLICT DO NOTHING;
