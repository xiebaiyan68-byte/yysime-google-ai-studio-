import React, { useState, useEffect } from 'react';
import { CHANNELS, MOCK_VIDEOS } from './constants';
import { Video, Channel, AppView } from './types';
import VideoPlayer from './components/VideoPlayer';
import Remote from './components/Remote';
import GeminiAssistant from './components/GeminiAssistant';
import { Command } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.BOOT);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [highlightedVideoIds, setHighlightedVideoIds] = useState<string[]>([]);
  const [highlightedChannelIds, setHighlightedChannelIds] = useState<string[]>([]);
  
  // "Boot" Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setView(AppView.HOME);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setView(AppView.PLAYER);
  };

  const handleChannelSelect = (channel: Channel) => {
    // Tune into the specific stream URL for this channel
    setSelectedVideo({
        id: channel.id,
        title: channel.name,
        description: channel.description,
        thumbnail: '', // Not used in player
        videoUrl: channel.streamUrl,
        category: channel.category,
        duration: 'LIVE',
        year: new Date().getFullYear(),
        isLive: true
    });
    setView(AppView.PLAYER);
  };

  const handleExitPlayer = () => {
    setSelectedVideo(null);
    setView(AppView.HOME);
  };

  const handleMenuClick = () => {
    if (view === AppView.PLAYER) {
      handleExitPlayer();
    } else if (isAssistantOpen) {
        setIsAssistantOpen(false);
    }
  };

  const handleMicClick = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  const handleGeminiRecommendation = (videoIds: string[], channelIds: string[]) => {
     setHighlightedVideoIds(videoIds);
     setHighlightedChannelIds(channelIds);
  };

  return (
    <div className="w-full h-screen bg-neutral-900 flex items-center justify-center p-4 md:p-8 gap-12 overflow-hidden selection:bg-none">
      
      {/* Physical TV Frame */}
      <div className="relative flex-1 max-w-5xl aspect-video bg-black rounded-[2rem] border-[16px] border-neutral-800 shadow-2xl overflow-hidden ring-1 ring-white/10 tv-glow group">
        
        {/* Screen Content */}
        <div className="absolute inset-0 bg-slate-950 text-white overflow-hidden font-sans">
            
            {/* Boot Screen */}
            {view === AppView.BOOT && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                    <Command size={80} className="text-white animate-pulse" />
                </div>
            )}

            {/* Home Screen */}
            <div className={`absolute inset-0 flex flex-col transition-opacity duration-700 ${view === AppView.HOME ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                
                {/* Status Bar */}
                <div className="h-16 w-full flex justify-between items-center px-12 pt-8 z-10">
                    <span className="font-semibold text-lg tracking-wide text-white/80">Gemini TV OS</span>
                    <span className="text-sm font-medium text-white/60">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</span>
                </div>

                {/* Hero / Featured Area (Top half) */}
                <div className="flex-1 px-12 flex flex-col justify-end pb-8 relative">
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1002/1200/800')] bg-cover bg-center opacity-40 mask-image-gradient" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    
                    <div className="relative z-10 max-w-2xl animate-fade-in-up">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider mb-4 uppercase text-white border border-white/10">Featured</span>
                        <h1 className="text-5xl font-bold mb-4 leading-tight">Cosmic Voyage</h1>
                        <p className="text-lg text-gray-300 line-clamp-2 mb-6 w-3/4">An immersive journey through the nebulae of the deep universe. Experience the silence and grandeur of space.</p>
                        <button 
                            onClick={() => handleVideoSelect(MOCK_VIDEOS[0])}
                            className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
                        >
                           Play Now
                        </button>
                    </div>
                </div>

                {/* Content Rows (Bottom half) */}
                <div className="h-[45%] bg-gradient-to-b from-slate-950 to-slate-900 overflow-y-auto px-12 pb-12 no-scrollbar">
                    
                    {/* Channels Row */}
                    <div className="mb-10">
                         <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Live Channels</h3>
                             {highlightedChannelIds.length > 0 && (
                                <span className="text-xs px-2 py-0.5 bg-blue-600 rounded text-white animate-pulse">Gemini Recommended</span>
                            )}
                         </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {CHANNELS.map(channel => {
                                const isRecommended = highlightedChannelIds.includes(channel.id);
                                return (
                                    <div 
                                        key={channel.id} 
                                        onClick={() => handleChannelSelect(channel)}
                                        className={`
                                            group/item flex-shrink-0 w-32 h-28 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300
                                            ${isRecommended ? 'ring-2 ring-blue-500 scale-105 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-white/5 hover:bg-white/10'}
                                        `}
                                    >
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-2 text-center">
                                            <div className={`p-2 rounded-full ${isRecommended ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'} group-hover/item:scale-110 transition-transform`}>
                                                 {channel.icon}
                                            </div>
                                            <span className="text-xs font-semibold text-gray-200 leading-tight">{channel.name}</span>
                                        </div>
                                        
                                        {/* Hover Overlay Description */}
                                        <div className="absolute inset-0 bg-blue-900/90 p-2 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity text-center">
                                            <span className="text-[10px] text-white font-medium">{channel.description}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Trending Videos Row */}
                    <div>
                         <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Trending Now</h3>
                            {highlightedVideoIds.length > 0 && (
                                <span className="text-xs px-2 py-0.5 bg-blue-600 rounded text-white animate-pulse">Gemini Recommended</span>
                            )}
                         </div>
                        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
                            {MOCK_VIDEOS.map(video => {
                                const isRecommended = highlightedVideoIds.includes(video.id);
                                return (
                                    <div 
                                        key={video.id} 
                                        onClick={() => handleVideoSelect(video)}
                                        className={`relative flex-shrink-0 w-64 aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group/card shadow-lg ${isRecommended ? 'ring-4 ring-blue-500 scale-105 z-10' : ''}`}
                                    >
                                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4">
                                            <h4 className={`font-semibold text-sm mb-1 ${isRecommended ? 'text-blue-200' : 'text-white'}`}>{video.title}</h4>
                                            <span className="text-xs text-gray-400">{video.category}</span>
                                        </div>
                                        {isRecommended && (
                                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                                                PICK FOR YOU
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Gemini Overlay */}
                <GeminiAssistant 
                    isOpen={isAssistantOpen} 
                    onClose={() => setIsAssistantOpen(false)} 
                    onRecommendation={handleGeminiRecommendation}
                />
            </div>

             {/* Video Player Overlay */}
            {view === AppView.PLAYER && selectedVideo && (
                <VideoPlayer video={selectedVideo} onExit={handleExitPlayer} />
            )}

        </div>

        {/* TV Brand Logo Bottom Bezel */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-30">
             <Command size={12} className="text-white" />
        </div>
        
        {/* Power LED */}
        <div className="absolute bottom-2 right-8 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] opacity-80" />
      </div>

      {/* Stand */}
      <div className="absolute bottom-0 md:bottom-auto md:top-[calc(50%+16rem)] w-48 h-12 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-b-xl z-0 shadow-xl transform perspective-500 rotate-x-12 opacity-0 md:opacity-100 hidden md:block" />


      {/* Controls / Remote Section (Desktop Layout) */}
      <div className="hidden lg:flex flex-col items-center justify-center gap-4 animate-fade-in-right">
        <Remote 
            onMenu={handleMenuClick}
            onSelect={() => {}} // Not fully mapped for mouse users, illustrative
            onNavigate={() => {}} 
            onMicClick={handleMicClick}
            onPlayPause={() => {
                 // Simple toggle play if player is active logic could go here
                 if (view === AppView.PLAYER) {
                    // Logic handled inside player mostly, or passed via context
                 }
            }}
            isMicActive={isAssistantOpen}
        />
        <p className="text-neutral-500 text-sm font-medium mt-4 max-w-[200px] text-center">
            Use the mouse to interact with the TV screen directly, or the remote for specific actions like <span className="text-blue-400">Gemini</span>.
        </p>
      </div>

       {/* Mobile Floating Button for Gemini */}
       <button 
        onClick={handleMicClick}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 active:scale-95 transition-all"
       >
        <div className="bg-white p-2 rounded-full">
            <Command size={24} className="text-blue-600 fill-current" />
        </div>
       </button>
    </div>
  );
};

export default App;