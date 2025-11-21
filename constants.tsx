import React from 'react';
import { Video, Channel } from './types';
import { Film, Music, Tv, Zap, Globe, Cpu, Newspaper, Trophy, Rocket, Leaf, Radio } from 'lucide-react';

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Cosmic Voyage',
    description: 'A journey through the stars and galaxies, exploring the wonders of the universe.',
    thumbnail: 'https://picsum.photos/id/1002/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Sci-Fi',
    duration: '12m',
    year: 2024,
  },
  {
    id: 'v2',
    title: 'Urban Rhythm',
    description: 'The heartbeat of the modern city, captured in stunning 4K resolution.',
    thumbnail: 'https://picsum.photos/id/1015/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Documentary',
    duration: '45m',
    year: 2023,
  },
  {
    id: 'v3',
    title: 'Alpine Serenity',
    description: 'Relaxing views of the Swiss Alps with calming ambient music.',
    thumbnail: 'https://picsum.photos/id/1018/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Nature',
    duration: '1h 20m',
    year: 2022,
  },
  {
    id: 'v4',
    title: 'Cyber Future',
    description: 'An analysis of upcoming AI technologies and their impact on society.',
    thumbnail: 'https://picsum.photos/id/1019/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Tech',
    duration: '22m',
    year: 2025,
  },
  {
    id: 'v5',
    title: 'Ocean Deep',
    description: 'Exploring the mariana trench and the creatures that live within.',
    thumbnail: 'https://picsum.photos/id/1026/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'Nature',
    duration: '50m',
    year: 2023,
  },
  {
    id: 'v6',
    title: 'Abstract Minds',
    description: 'A visual art piece challenging the perception of reality.',
    thumbnail: 'https://picsum.photos/id/1040/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Art',
    duration: '15m',
    year: 2024,
  },
    {
    id: 'v7',
    title: 'Speed of Light',
    description: 'Racing documentary featuring the fastest cars on the planet.',
    thumbnail: 'https://picsum.photos/id/1067/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'Sports',
    duration: '1h 10m',
    year: 2023,
  },
  {
    id: 'v8',
    title: 'Morning Coffee',
    description: 'Learn the art of brewing the perfect cup of coffee from world champions.',
    thumbnail: 'https://picsum.photos/id/1060/800/450',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    category: 'Lifestyle',
    duration: '18m',
    year: 2024,
  },
];

export const CHANNELS: Channel[] = [
  { 
    id: 'c1', 
    name: 'Global News 24', 
    description: '24/7 coverage of breaking news, politics, and global events.',
    icon: <Newspaper size={32} />, 
    type: 'channel',
    category: 'News',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
  },
  { 
    id: 'c2', 
    name: 'Apex Sports', 
    description: 'Live sports, extreme highlights, and in-depth analysis.',
    icon: <Trophy size={32} />, 
    type: 'channel', 
    category: 'Sports',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
  },
  { 
    id: 'c3', 
    name: 'Starlight Ent.', 
    description: 'Premium movies, hit series, and celebrity interviews.',
    icon: <Film size={32} />, 
    type: 'channel', 
    category: 'Entertainment',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  { 
    id: 'c4', 
    name: 'Terra Doc', 
    description: 'Award-winning documentaries exploring nature and history.',
    icon: <Globe size={32} />, 
    type: 'channel', 
    category: 'Documentary',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  { 
    id: 'c5', 
    name: 'CyberLife', 
    description: 'The future of tech, AI, and cybernetics from Silicon Valley.',
    icon: <Cpu size={32} />, 
    type: 'channel', 
    category: 'Technology',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  { 
    id: 'c6', 
    name: 'Mars Colony TV', 
    description: 'Live feeds from the first human settlement on Mars.',
    icon: <Rocket size={32} />, 
    type: 'channel', 
    category: 'Sci-Fi',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  { 
    id: 'c7', 
    name: 'Zen Garden', 
    description: 'Peaceful landscapes, yoga flows, and meditation guides.',
    icon: <Leaf size={32} />, 
    type: 'channel', 
    category: 'Lifestyle',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  },
  { 
    id: 'c8', 
    name: 'RetroWave FM', 
    description: 'Non-stop 80s aesthetics, synthwave music, and neon visuals.',
    icon: <Radio size={32} />, 
    type: 'channel', 
    category: 'Music',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  }
];