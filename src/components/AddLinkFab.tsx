import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

const domainCategories: Record<string, string> = {
  // Tech & Dev
  'github.com': 'Tech',
  'gitlab.com': 'Tech',
  'bitbucket.org': 'Tech',
  'stackoverflow.com': 'Tech',
  'docker.com': 'Tech',
  'kubernetes.io': 'Tech',
  'aws.amazon.com': 'Tech',
  'azure.microsoft.com': 'Tech',
  'cloud.google.com': 'Tech',
  'digitalocean.com': 'Tech',
  'vercel.com': 'Tech',
  'netlify.com': 'Tech',
  'heroku.com': 'Tech',
  'railway.app': 'Tech',
  'supabase.com': 'Tech',
  'firebase.google.com': 'Tech',
  'mongodb.com': 'Tech',
  'postgresql.org': 'Tech',
  'redis.io': 'Tech',
  'jenkins.io': 'Tech',
  'circleci.com': 'Tech',
  'grafana.com': 'Tech',
  'prometheus.io': 'Tech',
  'sentry.io': 'Tech',
  'datadog.com': 'Tech',
  'postman.com': 'Tech',
  'insomnia.rest': 'Tech',
  'swagger.io': 'Tech',
  // AI & Future Tech
  'chatgpt.com': 'AI Tools',
  'openai.com': 'AI Tools',
  'claude.ai': 'AI Tools',
  'bard.google.com': 'AI Tools',
  'gemini.google.com': 'AI Tools',
  'huggingface.co': 'AI Tools',
  'midjourney.com': 'AI Tools',
  'stability.ai': 'AI Tools',
  'jasper.ai': 'AI Tools',
  'copy.ai': 'AI Tools',
  'character.ai': 'AI Tools',
  'perplexity.ai': 'AI Tools',
  'replicate.com': 'AI Tools',
  'runpod.io': 'AI Tools',
  'elevenlabs.io': 'AI Tools',
  'leonardo.ai': 'AI Tools',
  'civitai.com': 'AI Tools',
  // Productivity & Enterprise
  'notion.so': 'Productivity',
  'trello.com': 'Productivity',
  'jira.atlassian.com': 'Productivity',
  'linear.app': 'Productivity',
  'asana.com': 'Productivity',
  'monday.com': 'Productivity',
  'clickup.com': 'Productivity',
  'slack.com': 'Productivity',
  'discord.com': 'Productivity',
  'teams.microsoft.com': 'Productivity',
  'zoom.us': 'Productivity',
  'meet.google.com': 'Productivity',
  'skype.com': 'Productivity',
  'drive.google.com': 'Productivity',
  'dropbox.com': 'Productivity',
  'box.com': 'Productivity',
  'onedrive.live.com': 'Productivity',
  'figma.com': 'Productivity',
  'miro.com': 'Productivity',
  'lucidchart.com': 'Productivity',
  'canva.com': 'Productivity',
  'airtable.com': 'Productivity',
  'typeform.com': 'Productivity',
  'salesforce.com': 'Productivity',
  'hubspot.com': 'Productivity',
  'zendesk.com': 'Productivity',
  // Indian Startups & Unicorns
  'zomato.com': 'Startups',
  'swiggy.com': 'Startups',
  'ola.com': 'Startups',
  'rapido.co': 'Startups',
  'flipkart.com': 'Startups',
  'myntra.com': 'Startups',
  'ajio.com': 'Startups',
  'meesho.com': 'Startups',
  'zerodha.com': 'Startups',
  'groww.in': 'Startups',
  'upstox.com': 'Startups',
  'paytm.com': 'Startups',
  'phonepe.com': 'Startups',
  'cred.club': 'Startups',
  'lenskart.com': 'Startups',
  'nykaa.com': 'Startups',
  'bookmyshow.com': 'Startups',
  'hotstar.com': 'Startups',
  'jio.com': 'Startups',
  'razorpay.com': 'Startups',
  // Food & Lifestyle
  'dominos.com': 'Food & Lifestyle',
  'pizzahut.com': 'Food & Lifestyle',
  'mcdonalds.com': 'Food & Lifestyle',
  'burgerking.com': 'Food & Lifestyle',
  'kfc.com': 'Food & Lifestyle',
  'starbucks.com': 'Food & Lifestyle',
  'subway.com': 'Food & Lifestyle',
  'dunkin.com': 'Food & Lifestyle',
  'tacobell.com': 'Food & Lifestyle',
  'doordash.com': 'Food & Lifestyle',
  'ubereats.com': 'Food & Lifestyle',
  'grubhub.com': 'Food & Lifestyle',
  // Fashion
  'shein.com': 'Fashion',
  'zara.com': 'Fashion',
  'hm.com': 'Fashion',
  'uniqlo.com': 'Fashion',
  'nike.com': 'Fashion',
  'adidas.com': 'Fashion',
  'puma.com': 'Fashion',
  'urbanic.com': 'Fashion',
  'purple.com': 'Fashion',
  'sephora.com': 'Fashion',
  'stockx.com': 'Fashion',
  'goat.com': 'Fashion',
  'grailed.com': 'Fashion',
  // Social & Dating
  'twitter.com': 'Social',
  'x.com': 'Social',
  'linkedin.com': 'Social',
  'instagram.com': 'Social',
  'facebook.com': 'Social',
  'reddit.com': 'Social',
  'tinder.com': 'Social',
  'bumble.com': 'Social',
  'hinge.co': 'Social',
  'grindr.com': 'Social',
  'okcupid.com': 'Social',
  'happn.com': 'Social',
  'snapchat.com': 'Social',
  'telegram.org': 'Social',
  'bereal.com': 'Social',
  'threads.net': 'Social',
  'whatsapp.com': 'Social',
  // Web3 & Crypto
  'bitcoin.org': 'Web3',
  'ethereum.org': 'Web3',
  'solana.com': 'Web3',
  'binance.com': 'Web3',
  'coinbase.com': 'Web3',
  'kraken.com': 'Web3',
  'metamask.io': 'Web3',
  'opensea.io': 'Web3',
  'rarible.com': 'Web3',
  'etherscan.io': 'Web3',
  'coinmarketcap.com': 'Web3',
  'coingecko.com': 'Web3',
  'uniswap.org': 'Web3',
  // Entertainment
  'youtube.com': 'Entertainment',
  'twitch.tv': 'Entertainment',
  'netflix.com': 'Entertainment',
  'primevideo.com': 'Entertainment',
  'hulu.com': 'Entertainment',
  'disney.com': 'Entertainment',
  'hbo.com': 'Entertainment',
  'spotify.com': 'Entertainment',
  'music.apple.com': 'Entertainment',
  'soundcloud.com': 'Entertainment',
  'store.steampowered.com': 'Entertainment',
  'epicgames.com': 'Entertainment',
  'roblox.com': 'Entertainment',
  'ign.com': 'Entertainment',
  'polygon.com': 'Entertainment',
  // Learning & News
  'udemy.com': 'Learning',
  'coursera.org': 'Learning',
  'edx.org': 'Learning',
  'khanacademy.org': 'Learning',
  'codecademy.com': 'Learning',
  'leetcode.com': 'Learning',
  'hackerrank.com': 'Learning',
  'geeksforgeeks.org': 'Learning',
  'w3schools.com': 'Learning',
  'developer.mozilla.org': 'Learning',
  'duolingo.com': 'Learning',
  'techcrunch.com': 'News',
  'theverge.com': 'News',
  'wired.com': 'News',
  'bloomberg.com': 'News',
  'forbes.com': 'News',
  'wsj.com': 'News',
  'nytimes.com': 'News',
  'bbc.com': 'News',
  'cnn.com': 'News',
  'medium.com': 'News',
  'dev.to': 'News',
  // Shopping
  'amazon.com': 'Shopping',
  'ebay.com': 'Shopping',
  'etsy.com': 'Shopping',
  'shopify.com': 'Shopping',
  'walmart.com': 'Shopping',
  'target.com': 'Shopping',
  'bestbuy.com': 'Shopping',
  'aliexpress.com': 'Shopping',
};

const keywordCategories: Record<string, string> = {
  'bank': 'Finance',
  'pay': 'Finance',
  'finance': 'Finance',
  'shop': 'Shopping',
  'store': 'Shopping',
  'buy': 'Shopping',
  'learn': 'Learning',
  'course': 'Learning',
  'study': 'Learning',
  'edu': 'Learning',
  'game': 'Entertainment',
  'play': 'Entertainment',
  'stream': 'Entertainment',
  'news': 'News',
  'blog': 'News',
  'article': 'News',
  'food': 'Food & Lifestyle',
  'pizza': 'Food & Lifestyle',
  'burger': 'Food & Lifestyle',
};

function autoCategorize(url: string): string {
  if (!url) return '';

  try {
    const domain = new URL(url).hostname.replace('www.', '');
    if (domainCategories[domain]) {
      return domainCategories[domain];
    }
  } catch (e) {
    // Invalid URL
  }

  const lowerUrl = url.toLowerCase();
  for (const [keyword, category] of Object.entries(keywordCategories)) {
    if (lowerUrl.includes(keyword)) {
      return category;
    }
  }

  return '';
}

export default function AddLinkFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Tech', 'AI Tools', 'Productivity', 'Startups', 'Food & Lifestyle', 'Fashion', 'Social', 'Web3', 'Entertainment', 'Learning', 'Shopping', 'Finance', 'News', 'Other'];

  useEffect(() => {
    const autoCat = autoCategorize(url);
    if (autoCat) {
      setCategory(autoCat);
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