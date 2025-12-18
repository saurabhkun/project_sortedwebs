import { Link, useLocation } from 'react-router-dom';
import { Zap, Home, Heart, Archive, Globe } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const categories = [
    { name: 'Research', color: 'bg-blue-900' },
    { name: 'Design', color: 'bg-purple-900' },
    { name: 'Dev Tools', color: 'bg-green-900' },
    { name: 'Entertainment', color: 'bg-orange-900' },
  ];

  const getActiveCategory = () => {
    if (location.pathname === '/favorites') return 'favorites';
    if (location.pathname === '/archives') return 'archives';
    return null;
  };

  const activeCategory = getActiveCategory();

  return (
    <div className="w-64 bg-gray-950 border-r border-blue-900/30 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 overflow-y-auto flex-1">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-bold text-blue-400">SortedWebs</span>
        </div>

        <nav className="space-y-3 mb-8">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              location.pathname === '/' && !activeCategory
                ? 'bg-blue-900/30 text-blue-400'
                : 'text-gray-400 hover:text-blue-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/explore"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              location.pathname === '/explore'
                ? 'bg-blue-900/30 text-blue-400'
                : 'text-gray-400 hover:text-blue-400'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span>Explore Stacks</span>
          </Link>
          <Link
            to="/favorites"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeCategory === 'favorites'
                ? 'bg-blue-900/30 text-blue-400'
                : 'text-gray-400 hover:text-blue-400'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Favorites</span>
          </Link>
          <Link
            to="/archives"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeCategory === 'archives'
                ? 'bg-blue-900/30 text-blue-400'
                : 'text-gray-400 hover:text-blue-400'
            }`}
          >
            <Archive className="w-5 h-5" />
            <span>Archives</span>
          </Link>
        </nav>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Smart Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/?category=${cat.name}`}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  activeCategory === cat.name
                    ? `${cat.color} text-white`
                    : 'bg-gray-900/50 text-gray-400 hover:bg-gray-900'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-blue-900/20">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 p-3 rounded-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm font-semibold">Pro Plan</div>
              <div className="text-xs text-gray-300">Upgrade for advanced features</div>
            </div>
            <div className="text-sm text-blue-400 font-semibold">$6/mo</div>
          </div>
          <div className="mt-2">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-sm py-2 rounded-md">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
}
