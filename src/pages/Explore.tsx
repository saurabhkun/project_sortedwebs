import React from 'react';

const stacks = [
  {
    title: "The Indie Hacker Starter Kit",
    tools: [
      { name: "Vercel", url: "https://vercel.com" },
      { name: "Supabase", url: "https://supabase.com" },
      { name: "Stripe", url: "https://stripe.com" },
      { name: "Tailwind", url: "https://tailwindcss.com" },
    ],
  },
  {
    title: "The Ultimate Designer Stack",
    tools: [
      { name: "Figma", url: "https://figma.com" },
      { name: "Dribbble", url: "https://dribbble.com" },
      { name: "Spline", url: "https://spline.design" },
      { name: "Framer", url: "https://framer.com" },
    ],
  },
  {
    title: "No-Code Empire",
    tools: [
      { name: "Bubble", url: "https://bubble.io" },
      { name: "Webflow", url: "https://webflow.com" },
      { name: "Zapier", url: "https://zapier.com" },
      { name: "Airtable", url: "https://airtable.com" },
    ],
  },
];

export default function Explore() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-2">Curated Stacks</h1>
      <p className="text-gray-400 mb-6">Hand-picked bundles to supercharge your workflow.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stacks.map((stack, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{stack.title}</h2>
            <ul className="space-y-2 mb-4">
              {stack.tools.map((tool, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>{tool.name}</span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-sm py-1 px-3 rounded"
                  >
                    Get Deal
                  </a>
                </li>
              ))}
            </ul>
            <button className="w-full bg-green-600 hover:bg-green-500 py-2 rounded-md">View Bundle</button>
          </div>
        ))}
      </div>
    </div>
  );
}
