import { Trash2, ExternalLink, Heart } from 'lucide-react';
import { Website } from '../lib/supabase';

interface WebsiteCardProps {
  website: Website;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

export default function WebsiteCard({ website, onDelete, onToggleFavorite }: WebsiteCardProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    Research: { bg: 'bg-blue-900/30', text: 'text-blue-400' },
    Design: { bg: 'bg-purple-900/30', text: 'text-purple-400' },
    'Dev Tools': { bg: 'bg-green-900/30', text: 'text-green-400' },
    Entertainment: { bg: 'bg-orange-900/30', text: 'text-orange-400' },
  };

  const colors = categoryColors[website.category] || { bg: 'bg-gray-900/30', text: 'text-gray-400' };

  return (
    <div className="group bg-gray-900/40 border border-blue-900/30 rounded-lg p-4 hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-900/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {website.favicon_url ? (
              <img
                src={website.favicon_url}
                alt={website.title}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Ccircle cx="12" cy="12" r="10"/%3E%3C/svg%3E';
                }}
              />
            ) : (
              <div className="w-6 h-6 bg-gray-800 rounded-full" />
            )}
            <h3 className="text-white font-semibold truncate">{website.title}</h3>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{website.description}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(website.id, !website.is_favorite)}
          className="ml-2 p-1 hover:bg-gray-900/50 rounded transition"
        >
          <Heart
            className={`w-5 h-5 ${
              website.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
          {website.category}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-blue-900/30 rounded transition text-blue-400 hover:text-blue-300"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              if (confirm('Delete this website?')) {
                onDelete(website.id);
              }
            }}
            className="p-2 hover:bg-red-900/20 rounded transition text-gray-500 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
