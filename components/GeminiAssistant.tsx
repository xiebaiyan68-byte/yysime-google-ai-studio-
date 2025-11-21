import React, { useState, useEffect, useRef } from 'react';
import { Video, ChatMessage } from '../types';
import { getGeminiRecommendations } from '../services/geminiService';
import { Send, Sparkles, X } from 'lucide-react';

interface GeminiAssistantProps {
  onClose: () => void;
  onRecommendation: (videoIds: string[], channelIds: string[]) => void;
  isOpen: boolean;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onClose, onRecommendation, isOpen }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I can help you find videos or tune into a channel. What are you in the mood for?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const result = await getGeminiRecommendations(userMsg);

    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: result.responseText }]);
    
    if (result.recommendedVideoIds.length > 0 || result.recommendedChannelIds.length > 0) {
        onRecommendation(result.recommendedVideoIds, result.recommendedChannelIds);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-[400px] h-full bg-slate-900/95 border-l border-white/10 shadow-2xl flex flex-col pt-10">
        
        {/* Header */}
        <div className="px-6 pb-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
                 <Sparkles className="text-blue-400 animate-pulse" />
                 <h2 className="text-xl font-semibold text-white">Gemini Assistant</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="text-gray-400" size={20} />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800 text-gray-200 border border-white/5'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl px-4 py-3 border border-white/5 flex gap-1 items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/5 bg-slate-900">
            <form onSubmit={handleSubmit} className="relative">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about channels or movies..."
                    className="w-full bg-slate-800 text-white pl-4 pr-12 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
                    autoFocus
                />
                <button 
                    type="submit"
                    disabled={!query.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                >
                    <Send size={16} />
                </button>
            </form>
             <p className="text-xs text-slate-500 mt-3 text-center">
                Powered by Gemini 2.5 Flash
            </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;