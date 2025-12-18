import { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import WebsiteCard from '../components/WebsiteCard';
import { useWebsites } from '../hooks/useWebsites';

export default function Dashboard() {
  const { websites, loading, deleteWebsite, updateWebsite } = useWebsites();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const path = location.pathname;
    const categoryParam = searchParams.get('category');
    if (path === '/favorites') {
      setActiveCategory('favorites');
    } else if (path === '/archives') {
      setActiveCategory('archives');
    } else if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory(null);
    }
  }, [location.pathname, searchParams]);

  const filteredWebsites = useMemo(() => {
    let filtered = websites;

    if (activeCategory === 'favorites') {
      filtered = filtered.filter((w) => w.is_favorite);
    } else if (activeCategory === 'archives') {
      filtered = filtered.filter((w) => w.is_archived);
    } else if (activeCategory) {
      filtered = filtered.filter((w) => w.category === activeCategory);
    } else {
      filtered = filtered.filter((w) => !w.is_archived);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(query) ||
          (w.description?.toLowerCase() || '').includes(query) ||
          w.url.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [websites, searchQuery, activeCategory]);

  return (
    <>
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="mt-24 p-8">
        {loading ? (
          <div className="text-center text-gray-400">Loading websites...</div>
        ) : filteredWebsites.length === 0 ? (
          <div className="text-center text-gray-400">
            {searchQuery ? 'No websites found matching your search.' : 'No websites yet. Start by adding one!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWebsites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                onDelete={deleteWebsite}
                onToggleFavorite={(id, isFavorite) => updateWebsite(id, { is_favorite: isFavorite })}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
