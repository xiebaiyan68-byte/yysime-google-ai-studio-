import React, { useEffect, useRef, useState } from 'react';
import { Video } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Radio, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  onExit: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onExit }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  let controlsTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    // Reset states when video changes
    setIsLoading(true);
    setIsPlaying(false);
    
    if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.log("Autoplay blocked or waiting for interaction", e));
    }

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(controlsTimeout);
    };
  }, [video.id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !video.isLive) {
      const progressVal = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressVal);
    }
  };

  const handleWaiting = () => setIsLoading(true);
  const handleCanPlay = () => setIsLoading(false);

  const handleEnded = () => {
    if (video.isLive && videoRef.current) {
        // Loop for live channels
        videoRef.current.currentTime = 0;
        videoRef.current.play();
    } else {
        setIsPlaying(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col justify-center items-center overflow-hidden animate-fade-in">
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/20">
             <Loader2 size={64} className="text-white animate-spin opacity-80" />
        </div>
      )}

      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onPlaying={() => setIsLoading(false)}
        onClick={togglePlay}
        playsInline
        crossOrigin="anonymous"
      />
      
      {/* Overlay Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* Live Badge (Only for Live Channels) */}
      {video.isLive && (
        <div className="absolute top-8 left-8 flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-3 py-1 rounded text-white font-bold text-xs tracking-wider z-50 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
        </div>
      )}

      {/* Top Bar */}
      <div className={`absolute top-0 left-0 right-0 p-8 flex justify-end items-start transition-transform duration-500 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={onExit} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-md transition-all text-sm font-medium">
            Done
        </button>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-12 transition-transform duration-500 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-white text-3xl font-bold mb-2">{video.title}</h2>
                <p className="text-gray-300 text-sm">{video.description}</p>
            </div>
            {video.isLive && (
                <div className="text-gray-400 text-xs font-mono uppercase tracking-widest">
                    Broadcast Signal • 1080p
                </div>
            )}
        </div>

        {/* Progress Bar (Hidden for Live) */}
        {!video.isLive && (
            <div className="w-full h-2 bg-gray-700 rounded-full mb-6 overflow-hidden cursor-pointer">
                <div 
                    className="h-full bg-white rounded-full transition-all duration-200" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        )}
        {video.isLive && (
             <div className="w-full h-1 bg-gray-800/50 rounded-full mb-6 overflow-hidden">
                 <div className="h-full w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-shimmer" />
             </div>
        )}

        <div className="flex items-center justify-center gap-10">
            {!video.isLive && <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={32} /></button>}
            
            <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                {isPlaying ? <Pause size={48} fill="white" /> : <Play size={48} fill="white" />}
            </button>

            {!video.isLive && <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={32} /></button>}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;