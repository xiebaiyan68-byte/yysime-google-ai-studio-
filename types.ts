import React from 'react';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  duration: string;
  year: number;
  isLive?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  type: 'app' | 'channel';
  category: string;
  streamUrl: string;
}

export enum AppView {
  BOOT = 'BOOT',
  HOME = 'HOME',
  PLAYER = 'PLAYER',
  GEMINI_SEARCH = 'GEMINI_SEARCH',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  recommendedVideoIds?: string[];
  recommendedChannelIds?: string[];
}