import React from 'react';
import { Code, PenTool } from 'lucide-react';

export default function Explore() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-2">Curated Starter Packs</h1>
      <p className="text-gray-400 mb-6">Hand-picked stacks to get you started quickly.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-900 rounded-full">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="font-semibold">Dev Stack</div>
              <div className="text-sm text-gray-400">Next.js · Tailwind · Supabase</div>
            </div>
          </div>
          <ul className="text-gray-300 space-y-1">
            <li>• Next.js + React</li>
            <li>• TypeScript</li>
            <li>• Tailwind CSS</li>
            <li>• Supabase</li>
          </ul>
          <div className="mt-4">
            <button className="bg-blue-600 hover:bg-blue-500 py-2 px-3 rounded-md text-sm">Use Pack</button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gray-900 rounded-full">
              <PenTool className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <div className="font-semibold">Designer Stack</div>
              <div className="text-sm text-gray-400">Figma · Component Kits · Handoff</div>
            </div>
          </div>
          <ul className="text-gray-300 space-y-1">
            <li>• Figma templates</li>
            <li>• Design systems</li>
            <li>• Icon sets</li>
            <li>• Handoff guides</li>
          </ul>
          <div className="mt-4">
            <button className="bg-pink-600 hover:bg-pink-500 py-2 px-3 rounded-md text-sm">Use Pack</button>
          </div>
        </div>
      </div>
    </div>
  );
}
