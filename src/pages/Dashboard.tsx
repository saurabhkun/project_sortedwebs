import { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import WebsiteCard from '../components/WebsiteCard';
import { useWebsites } from '../hooks/useWebsites';

export default function Dashboard() {
  const { websites, loading, deleteWebsite, updateWebsite } = useWebsites();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
    <div className="min-h-screen bg-gray-950">
      <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="ml-64 mt-24 p-8">
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
    </div>
  );
}
