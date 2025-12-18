import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

const domainCategories: Record<string, string> = {
  'youtube.com': 'Entertainment',
  'github.com': 'Dev Tools',
  'twitter.com': 'Social',
  'linkedin.com': 'Social',
  'figma.com': 'Design',
  'dribbble.com': 'Design',
  'stackoverflow.com': 'Dev Tools',
  'medium.com': 'Research',
  'notion.so': 'Productivity',
  'slack.com': 'Productivity',
  'discord.com': 'Social',
  'reddit.com': 'Entertainment',
};

export default function AddLinkFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Research', 'Design', 'Dev Tools', 'Entertainment'];

  useEffect(() => {
    if (url) {
      try {
        const domain = new URL(url).hostname.replace('www.', '');
        const autoCategory = domainCategories[domain];
        if (autoCategory) {
          setCategory(autoCategory);
        }
      } catch (e) {
        // Invalid URL, ignore
      }
    }
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !category) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('websites').insert({
        title,
        url,
        category,
      });
      if (error) throw error;
      setIsOpen(false);
      setTitle('');
      setUrl('');
      setCategory('');
      window.location.reload(); // Refresh to show new link
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Failed to add link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition"
      >
        <Plus className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Add New Link</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}