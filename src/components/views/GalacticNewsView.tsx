import React, { useState } from 'react';
import { Radio, Newspaper, AlertTriangle, TrendingUp, Award, Zap, ChevronRight } from 'lucide-react';
import { sound } from '../../sound';

interface NewsArticle {
  id: string;
  timestamp: string;
  category: 'War Alert' | 'Economy' | 'Exploration' | 'Alliance' | 'Science';
  title: string;
  content: string;
  author: string;
  isUrgent?: boolean;
}

export const GalacticNewsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const [articles] = useState<NewsArticle[]>([
    {
      id: 'news_1',
      timestamp: '10 mins ago',
      category: 'War Alert',
      title: 'CRISIS ALERT: Blackglass Oathguard Hold the Cinderfold Gate',
      content: 'Marshal Vaeric has called the Ashen clans to reinforce the eastern pass after a band of oathglass mimics copied the watchword. Crownroad Wardens are escorting families to safety.',
      author: 'Crownroad Gazette · Cinder March Desk',
      isUrgent: true,
    },
    {
      id: 'news_2',
      timestamp: '35 mins ago',
      category: 'Economy',
      title: 'MARKET WATCH: Aether Prices Rise After the Amber Road Reopens',
      content: 'A clear road between Amberdeep and the Sunward Coast has brought more caravans to market. Factors expect prices to settle after the next First Market.',
      author: 'Amber Road Ledger',
    },
    {
      id: 'news_3',
      timestamp: '1 hour ago',
      category: 'Science',
      title: 'BREAKTHROUGH: Glassroot Scribes Restore a Broken Waystone',
      content: 'Rune-binders from the Ironroot Clans and Glassroot Assembly have joined a split road-mark without claiming the crossing for either hold. The first courier reached Moonwell Hall before dusk.',
      author: 'Arcanist Scriptorium',
    },
    {
      id: 'news_4',
      timestamp: '3 hours ago',
      category: 'Exploration',
      title: 'DISCOVERY: Delvers Find a Sealed Hall Beneath Elderstone',
      content: 'A Deepdelve company uncovered an intact oathbarrow beneath the northern cairns. Its door bears nine names and a warning that the waystone within must not be moved.',
      author: 'Lantern Cartographers',
    },
  ]);

  const filtered = filter === 'all' ? articles : articles.filter((a) => a.category.toLowerCase().includes(filter));

  return (
    <div className="space-y-6" id="galactic-news-root">
      {/* Header */}
      <div className="p-6 bg-white border border-[#dedede] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#777777] uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 text-[#111111]" />
            <span>FEATURE 49 · LETTERS FROM THE MARCHES</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] tracking-tight">The Crownroad Gazette</h1>
          <p className="text-xs text-[#555555] mt-1">
            Dispatches on border troubles, market bargains, discoveries, and the difficult work of keeping old roads open.
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 flex-wrap">
          {['all', 'war', 'economy', 'science', 'exploration'].map((c) => (
            <button
              key={c}
              onClick={() => { sound.play('click'); setFilter(c); }}
              className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors cursor-pointer border ${
                filter === c ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#555] border-[#ddd] hover:bg-[#fafafa]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* News Feed Articles */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 bg-white border transition-colors ${
              item.isUrgent ? 'border-red-500 bg-red-50/20' : 'border-[#dedede]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-xs ${
                    item.isUrgent
                      ? 'bg-red-600 text-white'
                      : 'bg-[#111111] text-white'
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-[#777]">{item.timestamp}</span>
              </div>
              <span className="text-[10px] font-mono text-[#888]">{item.author}</span>
            </div>

            <h2 className="text-base font-bold text-[#111111] mb-2">{item.title}</h2>
            <p className="text-xs text-[#444] leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
