import { Search, User } from 'lucide-react';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <div className="h-24 bg-gradient-to-b from-gray-900/80 to-transparent backdrop-blur-xl border-b border-blue-900/30 fixed top-0 right-0 left-64 flex items-center px-8 z-40">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400/50" />
          <input
            type="text"
            placeholder="Search websites..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-blue-900/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-gray-900/70 transition"
          />
        </div>
      </div>
      <button className="ml-6 p-2 hover:bg-gray-900/50 rounded-lg transition">
        <User className="w-6 h-6 text-blue-400" />
      </button>
    </div>
  );
}
