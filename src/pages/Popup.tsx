import { useState } from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';

export default function Popup() {
  const { websites, addWebsite } = useWebsites();
  const [showSaving, setShowSaving] = useState(false);

  const recentWebsites = websites.slice(0, 5);

  const handleSaveTab = async () => {
    setShowSaving(true);
    await addWebsite({
      title: 'New Tab - ' + new Date().toLocaleTimeString(),
      description: 'Saved from popup',
      url: 'https://example.com',
      category: 'Research',
      favicon_url: null,
      is_favorite: false,
      is_archived: false,
    });
    setTimeout(() => setShowSaving(false), 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div
        className="w-[400px] h-[600px] bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border border-blue-900/50 rounded-xl shadow-2xl shadow-blue-900/30 flex flex-col"
        style={{
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(59, 130, 246, 0.1)',
        }}
      >
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-blue-900/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-blue-400">SortedWebs</span>
            </div>
            <p className="text-xs text-gray-500">Save and organize web links instantly</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <button
              onClick={handleSaveTab}
              disabled={showSaving}
              className={`relative w-32 h-32 rounded-full font-bold text-lg transition-all ${
                showSaving
                  ? 'bg-green-500 text-white scale-95'
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500'
              }`}
              style={{
                boxShadow: showSaving
                  ? '0 0 20px rgba(34, 197, 94, 0.5)'
                  : '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(96, 165, 250, 0.3)',
              }}
            >
              <span className={`transition-all ${showSaving ? 'opacity-0' : 'opacity-100'}`}>
                {showSaving ? 'Saved!' : 'Save Tab'}
              </span>
              {showSaving && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </span>
              )}
              {!showSaving && (
                <style>{`
                  @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(96, 165, 250, 0.3); }
                    50% { box-shadow: 0 0 50px rgba(59, 130, 246, 0.8), inset 0 0 40px rgba(96, 165, 250, 0.5); }
                  }
                `}</style>
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-6">Click to save current tab</p>
          </div>

          <div className="px-6 pb-4 border-t border-blue-900/30 flex-1 overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Saves</h3>
            <div className="space-y-2">
              {recentWebsites.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-4">No saves yet</p>
              ) : (
                recentWebsites.map((website) => (
                  <a
                    key={website.id}
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-900/50 transition group"
                  >
                    {website.favicon_url && (
                      <img src={website.favicon_url} alt="" className="w-4 h-4 rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate group-hover:text-blue-400 transition">
                        {website.title}
                      </p>
                      <p className="text-xs text-gray-600 truncate">{website.category}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-blue-400 flex-shrink-0 transition opacity-0 group-hover:opacity-100" />
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
